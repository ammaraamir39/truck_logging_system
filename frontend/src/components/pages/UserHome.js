import React, { useState, useEffect } from "react";
import {get,del, post} from "../../axios";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [users, setUser] = useState([]);

  // const headers = {
  //   'Content-Type': 'application/json',
  //   'authorization': localStorage.getItem('accessToken')
  // }

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await get("/registerUser");
    setUser(result?.reverse());
  };

  const deleteUser = async (email) => {
    let deleteUser = await post(`/registerUser/deleteUser`,{email});
    toast.success(deleteUser.message)
    loadUsers();
  };

  return (
    <div className="container">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end" style={{marginTop:'10px'}}>
      <NavLink class="btn btn-dark" exact to="/VehicleHome" role="button">Go To Vehicle Page</NavLink>
      <NavLink class="btn btn-dark" exact to="/users/add" role="button">Add User Request</NavLink>
      </div>
      <div className="py-4">
        <h1>User Page</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Route Details</th>
              <th scope="col">Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.details}</td>
                <td>{user?.no}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/display/${user._id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`users/edit/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger mr-2"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
