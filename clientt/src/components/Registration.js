import React, { useEffect, useState } from "react";
import Axios from "axios";
import '../App.css';

const Registration = () => {

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="registration">
      <h1>Registration</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="text"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <button onClick={register}> Register </button>

      <br></br>

      <p>
        Already registered?<br />
        <span className="line">
          {/*put router link here*/}
          <a href="/">Sign In</a>
        </span>
      </p>

    </div>

  )
}

export default Registration