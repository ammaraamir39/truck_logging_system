import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { ToastContainer, toast } from 'react-toastify';

import '../../App.css';
import {
  FacebookLoginButton,
  InstagramLoginButton
} from "react-social-login-buttons";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post("/registerUser/signin", data).then(res =>{
      console.log(res)
      localStorage.setItem('accessToken',res?.data?.token)
      toast.success("Logged In Successfully");
      window.location.href = "/UserHome"
    }).catch(err =>{
      toast.error("Invalid Credentials")
      console.log(err)
    })
   
  }

  render() {
    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/sign-up" className="formFieldLink">
              Create an account
            </Link>
          </div>

        
        </form>
      </div>
    );
  }
}

export default Login;