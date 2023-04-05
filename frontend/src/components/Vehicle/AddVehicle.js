import React, { useState } from "react";
import {post} from '../../axios'
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    driverName: "",  
    no: "",
    vehicleNumber:"",
    vehicleType: "",
    rout: "",
    cost: "",
    status: ""
  });

  const { driverName, no, vehicleNumber, vehicleType, rout, cost, status } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    try {
      
      e.preventDefault();
      let vehicle = await post("/registerVehicle", user);
      console.log("Vehicle = > ",vehicle)
      if(!vehicle.status) {
        console.log("Vehicle message = > ",vehicle.message)
        alert(vehicle.message)
      }else{
        toast.success('Vehicle Added Successfully!!')
        history.push("/VehicleHome");
        // setTimeout(()=>{
        // history.push("/VehicleHome")
        //   } ,1000)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    
    <div className="container">
     
      <div className="w-75 mx-auto shadow p-5">
      
        <h2 className="text-center mb-4">Add A Vehicle</h2>
        <form onSubmit={e => onSubmit(e)}>

        <div className="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" 
        placeholder="name@example.com"
        name="driverName"
        value={driverName}
        onChange={e => onInputChange(e)}
        />
        <label for="floatingInput">Enter Driver Name</label>
        </div>
        
        <div className="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" 
          placeholder="phone"
          name="no"
          value={no}
          onChange={e => onInputChange(e)}
          />
          <label for="floatingInput">Enter Your Phone Number</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" class="form-control" id="floatingPassword" 
          placeholder="Vehicle Number"
          name="vehicleNumber"
          value={vehicleNumber}
          onChange={e => onInputChange(e)} 
          />
          <label for="floatingInput">Enter Your Vehicle Number</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" class="form-control" id="floatingPassword" 
        placeholder="type"
        name="vehicleType"
        value={vehicleType}
        onChange={e => onInputChange(e)} 
        />
        <label for="floatingPassword">Enter Your Veicle Type</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" class="form-control" id="floatingPassword" 
        placeholder="rout"
        name="rout"
        value={rout}
        onChange={e => onInputChange(e)} 
        />
        <label for="floatingPassword">Enter Your Route</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" class="form-control" id="floatingPassword" 
        placeholder="cost"
        name="cost"
        value={cost}
        onChange={e => onInputChange(e)} 
        />
        <label for="floatingPassword">Enter Your Cost</label>
        </div>
        <div className="form-floating mb-3">
        <input type="text" class="form-control" id="floatingPassword" 
        placeholder="status"
        name="status"
        value={status}
        onChange={e => onInputChange(e)} 
        />
        <label for="floatingPassword">Enter Status (Available or not)</label>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="submit" className="btn btn-light" onClick= {onSubmit}>Submit</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
