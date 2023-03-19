// Use section instead div.

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";
import '../App.css';

function Login() {

    // Variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    // Login function defination
    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].username);
            }
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].username);
            }
        });
    }, []);

    //HTML 
    return (

        <div className="login">
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username..."
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Password..."
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button onClick={login}> Login </button>

            <br></br>

            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/registration">Sign Up</Link>
                </span>
            </p>

            <br></br>
            <br></br>

            <h1>{loginStatus}</h1>
        </div >

    )
}

export default Login