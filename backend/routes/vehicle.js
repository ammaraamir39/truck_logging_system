const router = require("express").Router();
const mongoose = require("mongoose");
const Vehicle = require("../models/vehicleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



var jwtAuth = (req, res, next) => {
  var token = req.headers.authorization;
  
  jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
    if(err){
      res.status(401).json("invalid tokken")
    }else{
      next();
    }

  })
}
// Async-Await
router.post("/", jwtAuth,async (req, res) => {

  const { driverName , no,vehicleNumber, vehicleType, rout, cost, status} = req.body;
  if ( !vehicleType || !driverName || !vehicleNumber || !rout || !cost)  {
    return res.status(422).json({error:"filled all the fields"});
  }

  try {

      const newVehicle = new Vehicle({ driverName, no, vehicleType, vehicleNumber,rout, cost, status});

      const vehicleRegister = await newVehicle.save();
     
  
      if(vehicleRegister) {
        res.status(200).json({message: "Vehicle registerd succesfully..."});
      } else {
        res.status(500).json({error: "Failed to register"})
      }

  } catch(err) {
    console.log(err);
  }
});


router.get("/:id",jwtAuth ,async (req, res) => {
    try {
      const data = await Vehicle.findById(req.params.id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
});



router.patch("/updateVehicle",jwtAuth ,async (req, res) => {
  const { name, email, no, city, vehicleType, rout, cost, status} = req.body;
  try {
    const vehicleExist = await Vehicle.findOne({ email:email })
    // console.log(userExist);

    if(vehicleExist) {
      const key = vehicleExist._id;
      // console.log(key);
       const updatevehicle = new Vehicle({ name, email, no, city, vehicleType, rout, cost, status});
      Vehicle.findByIdAndUpdate(key, {name: req.body.name,
      email: req.body.email, no: req.body.no, city: req.body.city, vehicleType: req.body.vehicleType, rout: req.body.rout, cost: req.body.cost, status: req.body.status}).then(() => 
      {res.status(200).json({message: "Vehicle Update succesfully..."});
      })
    }
  }
  catch(err) {
  }
})

router.get("/", jwtAuth,async (req, res) => {
  try {
    const data = await Vehicle.find();
    res.status(200).json(data);
} catch (err) {
    res.status(500).json(err);
}
})

router.delete('/:id', jwtAuth,async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Vehicle.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});


module.exports = router; 