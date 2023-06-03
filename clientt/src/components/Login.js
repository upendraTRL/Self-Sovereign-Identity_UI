// Use section instead div.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import '../App.css';

import lg from './login.jpg';

function Login() {

    // Variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    // Login function defination
    const [users, setUsers] = useState([]);

    const login = () => {

        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                // <Navigate to="/registration" replace={true} />

                localStorage.setItem('username', username);

                if (response.data[0].usertype == "holder") {
                    // console.log("HOLDERRRRRRR");
                    navigate("/holder");
                } else if (response.data[0].usertype == "verifier") {
                    // console.log("verifier");
                    navigate("/verifier");
                } else if (response.data[0].usertype == "issuer") {
                    // console.log("issuer");
                    navigate("/issuer");
                } else {
                    console.log("Not Authorized");
                }

                console.log("REACTTTTTTTT");
                setLoginStatus(response.data[0].username);
            }
        });
    };

    useEffect(() => {
        const username = localStorage.getItem('username'); // Retrieve id from localStorage


        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].username);
            }
        });

        Axios.get(`/users?id=${username}`)
            .then(response => {
                setUsers(response.data);
                console.log("New API");
            })
            .catch(error => {
                console.error(error);
            });


    }, []);

    //HTML 
    return (

        <div className="login">

            <img src={lg} />

            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username..."
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <br></br>
            <input
                type="password"
                placeholder="Password..."
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <br></br>
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