import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../App.css';

import lg from './reg.jpg';

const Registration = () => {

  const navigate = useNavigate();

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [usertypeReg, setUsertypeReg] = useState("");

  //Dropdown
  const options = [
    { value: "issuer", label: "Issuer" },
    { value: "holder", label: "Holder" },
    { value: "verifier", label: "Verifier" }
  ];

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
      usertype: usertypeReg,
    }).then((response) => {
      if(response.status == 200){
        if(window.confirm("Successfully registered, Please login!")) {
          window.location.href = "http://localhost:3000/"
        }
      }
      console.log(response);
    });

  };

  return (
    <div className="registration">
      <img src={lg} />
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

      <br></br>

      <Dropdown
        isSearchable
        isMulti
        placeHolder="Usertype"
        options={options}
        onChange={(value) => setUsertypeReg(value.value)}
      />

      <br></br>

      <button onClick={register}> Register </button>
      {/* <button onClick={console.log(register)}> Show register </button> */}

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