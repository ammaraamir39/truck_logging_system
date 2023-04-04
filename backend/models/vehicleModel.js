const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const vehicleSchema = new mongoose.Schema({
    driverName: {
        type: String,
        require: true
    },
 
    no: {
        type:String, 
         
    },
    vehicleType: {
        type: String
    },
    vehicleNumber:{
        type:String,
        unique:true
    },

    rout: {
        type: String
    },
    cost: {
        type: Number
    },

    status: {
        type: String
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
},
{timestamps: true});   



module.exports = mongoose.model("vehicles", vehicleSchema);