// css

const express = require("express");
const mysql = require("mysql2"); //imp to use mysql2 instead of mysql1, to avoid following error.
//Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; 
//consider upgrading MySQL client
const cors = require("cors");

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

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'loginsystem'
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const usertype = req.body.usertype;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (username, password, usertype) VALUES (?,?,?)",
            [username, hash, usertype],
            (err, result) => {
                console.log(result);
                if(typeof err === "object"){
                    console.log('Successful registration!');
                    res.status(200).send("Success");
                }
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
                    console.log(password, result[0].password, response);
                    if (response) {

                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                        // console.log("RESULT - " + result);
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

app.listen(3001, () => {
    console.log("running server");
});






// My Part
// "INSERT INTO users (username, password) VALUES (?,?)",

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'root',
//     database: 'loginsystem'
// });