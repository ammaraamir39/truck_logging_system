import React, { useState, useEffect } from "react";
import {get,put} from "../../axios";
import { useHistory, useParams } from "react-router-dom";
import {  toast } from 'react-toastify';


const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    no: "",
    details: ""
  });

  const { name, email, no, details } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    try {
      e.preventDefault();
      await put(`/registerUser/updateUser`, user);
      toast.success('User updated successfully')
      history.push("/");  
    } catch (error) {
      toast.error('Error updating user')
    }
    
  };

  const loadUser = async () => {
    const result = await get(`/registerUser/${id}`);
    setUser({
      name :result.name ?  result.name : "",
      email : result.email ? result.email : "",
      no : result.no ? result.no : "",
      details: result.details ? result.details : ""
    });
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group" style={{marginBottom: '10px'}}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group" style={{marginBottom: '10px'}}>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group" style={{marginBottom: '10px'}}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="no"
              value={no}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group" style={{marginBottom: '10px'}}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your details"
              name="details"
              value={details}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
