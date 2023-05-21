// Issues: -
// 1. Login checks only first occurance of username. Eg: two records - abc:123, abc:abc
//    If entered abc, it'll check first abc.

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require('dotenv').config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

// const db = mysql.createConnection({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     password: process.env.DB_PASS,
//     database: process.env.DATABASE
// });

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hash],
            (err, result) => {
                console.log(err);
            }
        );
    });
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    // console.log(password, result[0].password, response);
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong username/password combination!" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    );
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////CALL API FROM NESTJS//////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  axios for remote API call
const axios = require('axios');


//create connection invitation
app.post("/connections/create",(req,res)=>{

      console.log("Inside create connections")
    axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/connections/create-invitation`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
})

//receive connection invitation
app.post("/connections/receive",(req,res)=>{

    console.log("Inside receive connections")
  axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/connections/receive-invitation`)
  .then(response => {
    console.log(response.data);
    
  })
  .catch(error => {
    console.error(error);
  });
})


//send issue credential
app.post("/issue-credential/send",(req,res)=>{

    console.log("Inside issue credential send")
  axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/issue-credential/send-credential`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
})


///// get credential by connection id
app.get("/issue-credential/get-credentials",(req,res)=>{

    console.log("Inside issue credential send")
  axios.get(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/issue-credential/records`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
})








app.listen(process.env.SERVER, () => {
    console.log("running on server",process.env.SERVER);
});






// My Part
// "INSERT INTO users (username, password) VALUES (?,?)",

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'root',
//     database: 'loginsystem'
// });