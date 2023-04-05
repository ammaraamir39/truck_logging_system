const mongoose = require("mongoose");
const router = require("express").Router();
const dotenv = require('dotenv')
const User = require("../models/userModel");
const sanitize = require('mongo-sanitize')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config()


var jwtAuth = (req, res, next) => {
  console.log("Req headers = > ",req.headers.headers)
  var token = req.headers.authorization;
  console.log("Token => ",token)
  if(!token) return res.status(401).json({message:"Token not found"}) 
  jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
    if(err){
      res.status(401).json({message:"Invalid token"})
    }else{
      next();
    }

  })
}





router.post("/", async (req, res) => {

    const { name, password, email, no} = req.body;
    if ( !name || !password || !email || !no ) {
      return res.status(422).json({error:"filled all the fields"});
    }

    try {
        const userExist = await User.findOne({ email:String(email) })
   
        if(userExist) {
          return res.status(422).json({message:"Email already exist",status:false});
        }
          
        const newuser = new User({ name, password, email, no});

        const userRegister = await newuser.save();
        // await newuser.genrateAuthToken();

      
        if(userRegister) {
          res.status(200).json({message: "User registerd succesfully...",status:true});
        } else {
          res.status(500).json({message: "Failed to register",status:false})
        }
  
    } catch(err) {
      console.log(err);
      res.status(500).json({message:err.message,status:false})
    }
  });

  router.put("/updateUser", 
  jwtAuth,
  async (req, res) => {
    //easily accessible without the token authentication
    // let email = req.body.email
    //NOw it is safe from the nosql injection
    let email = String(req.body.email)

    try {
      const userExist = await User.findOne({email})
      console.log(userExist);
      
        if(!userExist) return res.status(400).send({message:"User not found",status:false})  
        const key = userExist._id;
        // console.log(key);
        //  const updateuser = new User({ name, email, details, no});
        User.findByIdAndUpdate(key, {name: req.body.name,
        email:userExist.email,  details: req.body.details, no: req.body.no}).then(() => 
        {res.status(200).json({message: "User Updated succesfully...",status:true});
        })
      }
    
    catch(err) {
      res.status(500).json({message:err.message,status:false})
    }
  })

  router.get("/", 
  jwtAuth, //If we remove the token authentication then it will be easier for the user to access the data
  async (req, res) => {
    try {
      const data = await User.find();
      res.status(200).json(data);
  } catch (err) {
      res.status(500).json({message:err.message});
  }
  })

  router.get("/:id", 
  jwtAuth,
  async (req, res) => {
    try {
         //this is vulnerable to invalid id that can be breached by the user 
        // const data = await User.findById(req.params.id);
        
        //now this is safe
        let userId = sanitize(req.params.id)
        const data = await User.findById(userId)
        
        
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
  });


//example breach
//{"email": {"$ne": null}, "password": {"$ne": null} }
router.post("/signin", async (req,res) => {
  try {
      //eecuting data breach

      // let email = req.body.email
      // let password = req.body.password
        
      //preventing data Breach

      let email = String(req.body.email)
      let password = String(req.body.password)
      
      if (!email || !password) {
          return res.status(400).json({error:"Plz fill the data"});
        }
        const userLogin = await User.findOne({email: email});
        // console.log(userLogin);
        console.log("user login=> ",userLogin)
        if(!userLogin && userLogin === null) return res.status(400).send({message: "User nottt found"})

        if (userLogin) {
          //Just this to implement nosql injection 
          // return res.status(200).json({message:"User Signed In Successfully",user:userLogin})
          
          //this is to prevent nosql injection

          bcrypt.compare(password, userLogin.password,(err,succ)=>{
          
            if (!succ) {
                return res.status(400).json({error:"Invalid Password"});
            } else {
                const token = jwt.sign({email,user_id:userLogin._id},process.env.SECRET_KEY,{
                  expiresIn:'6h'
                })
                console.log("Token - > ",token)
                return res.status(200).json({message:"User Signin Successfully..",user:userLogin,token})
            }
          });
         
        } else {
              res.status(400).json({error:"Invalid Creditials"});
        }
        
    } catch (err) {
      res.status(500).json({error : err});
      console.log(err);
    }
});

  router.post('/deleteAll',async(req,res)=>{
    try {
      let query = {email:req.body.email}
      await User.deleteMany(query)
      res.status(200).json({
        message:"Users Deleted Successfully"
      })
    } catch (error) {
      res.status(400).send({
        message:error.message 
      })
    }
  })

router.post('/deleteUser',
jwtAuth,
async (req, res) => {
  try {
    //easy vulnerability  {"email": {"$ne": null}}
    // let email = req.body.email

    let email = sanitize(req.body.email);
    if(!email) return res.status(400).json({message:"Invalid email or missing email",status:false})
    let deleteUser = await User.findOneAndDelete({email})
    console.log("Delete User = > ",deleteUser)
    res.json({ message: "User deleted successfully." ,status:true});
    
  } catch (error) {
    res.status(400).json({message: "User not deleted due to some errors",status:false})   
  }
});

  module.exports = router; 