import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {get} from "../../axios";

const User = () => {
  const [user, setUser] = useState({
    driverName: "",
    no: "",
    vehicleNumber:"",
    vehicleType: "",
    rout: "",
    cost: "",
    status: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await get(`/registerVehicle/${id}`);
    setUser(res);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/VehicleHome">
        back to Home
      </Link>
      <h1 className="display-4">Requested Vehicle User Info For: {user?.driverName}</h1>
      <hr />
      <ul className="list-group">
        <li className="list-group-item">name: {user?.driverName}</li>
        {/* <li className="list-group-item">email: {user?.email}</li> */}
        <li className="list-group-item">phone: {user?.no}</li>
        <li className="list-group-item">City: {user?.vehicleNumber}</li>
        <li className="list-group-item">Vehicle Type: {user?.vehicleType}</li>
        <li className="list-group-item">Route For Vehicle: {user?.rout}</li>
        <li className="list-group-item">Cost: {user?.cost}</li>
        <li className="list-group-item">Status: {user?.status}</li>
      </ul>
    </div>
  );
};

export default User;