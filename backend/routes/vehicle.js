const router = require("express").Router();
const mongoose = require("mongoose");
const Vehicle = require("../models/vehicleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");



var jwtAuth = (req, res, next) => {
  console.log("Req.headers = > ",req.headers)
  var token = req.headers.authorization;
  if(!token) return res.status(401).send({message:"Token not found"})
  jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
    if(err){
      res.status(401).json("invalid tokken")
    }else{
      next();
    }

  })
}
// Async-Await
router.post("/", 
  jwtAuth,  
  async (req, res) => {

  const { driverName , no,vehicleNumber, vehicleType, rout, cost, status} = req.body;
  if ( !vehicleType || !driverName || !vehicleNumber || !rout || !cost)  {
    return res.status(422).json({message:"filled all the fields"});
  }

  try {

      const vehicle =await Vehicle.findOne({vehicleNumber:String(vehicleNumber)})
      console.log("Vehicle = > ",vehicle)
      if(vehicle) return res.status(200).json({message:"vehicle already exists",status:false})
      const newVehicle = new Vehicle({ driverName, no, vehicleType, vehicleNumber,rout, cost, status});

      const vehicleRegister = await newVehicle.save();
     
  
      if(vehicleRegister) {
        res.status(200).json({message: "Vehicle registerd succesfully...",status:true});
      } else {
        res.status(500).json({message: "Failed to register",status:false})
      }

  } catch(err) {
    console.log("error",err.message);
    res.status(400).json({message:"Failed to register vehicle",status:false})
  }
});


router.get("/:id",
  jwtAuth ,
  async (req, res) => {
    try {
      let vehicleId = sanitize(req.params.id)
      const data = await Vehicle.findById(vehicleId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({message:err.message});
    }
});



router.put("/updateVehicle",
  // jwtAuth ,
  async (req, res) => {
  const { driverName,  no,  vehicleType, vehicleNumber ,rout, cost, status} = req.body;
  try {
    //easily accessible and vulnerable 
    // const vehicleExist = await Vehicle.findOne({ vehicleNumber })
    // console.log(userExist);
    const vehicleExist = await Vehicle.findOne({ vehicleNumber : String(vehicleNumber)})
    console.log("VehilceExist = > ",vehicleExist)
    if(vehicleExist) {
      const key = vehicleExist._id;
      // console.log(key);

      Vehicle.findByIdAndUpdate(key, {driverName: req.body.driverName,
       no: req.body.no, vehicleNumber: req.body.vehicleNumber, vehicleType: req.body.vehicleType, rout: req.body.rout, cost: req.body.cost, status: req.body.status}).then(() => 
      {res.status(200).json({message: "Vehicle Update succesfully...",status:true});
      })
    }else{
      res.status(200).json({message:"Vehicle Not updated",status:false})
    }
  }
  catch(err) {
    console.log("Error in updating vehicle => ",err)
    res.status(500).json({message:err.message,status:false})
  }
})

router.get("/", 
jwtAuth,
async (req, res) => {
  try {
    const data = await Vehicle.find();
    res.status(200).json(data);
} catch (err) {
    res.status(500).json({message:err.message});
}
})

router.delete('/:id', 
jwtAuth,
async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Vehicle.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});


module.exports = router; 