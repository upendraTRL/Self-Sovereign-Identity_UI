// css
//Tasks:
// 1. fetch username from localStorage

const express = require("express");
const mysql = require("mysql2"); //imp to use mysql2 instead of mysql1, to avoid following error.
//Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; 
//consider upgrading MySQL client
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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


//Database connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'loginsystem'
});

// Configure session middleware
app.use(
    session({
        secret: 'your-secret-key', // Replace with a secret key for session encryption
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000, // Set the session cookie expiration time (30 days in this example)
        },
    })
);



app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const usertype = req.body.usertype;
    const displayname = req.body.displayname;

    //Default entry
    const schema_id = "0";
    const cred_def_id = "0";

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (username, password, usertype, displayname, schema_id, cred_def_id) VALUES (?,?,?,?,?,?)",
            [username, hash, usertype, displayname, schema_id, cred_def_id],
            (err, result) => {
                console.log(result);
                if (typeof err === "object") {
                    console.log('Successful registration!');
                    res.status(200).send("Success");
                }
                console.log(err);
            }
        );
    });
});

app.post("/newcard", (req, res) => {
    const schema_id = req.body.schema_id;
    const cred_def_id = req.body.cred_def_id;
    const username = req.body.username;

    db.query(
        "UPDATE users SET schema_id = ?, cred_def_id = ? WHERE username = ?",
        [schema_id, cred_def_id, username],
        (err, result) => {
            console.log(result);
            if (typeof err === "object") {
                console.log('Successful entered!');
                res.status(200).send("Success");
            }
            console.log(err);
        }
    );

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
                        console.log("Name = ", username);

                        req.session.user = result; // Store user data in the session
                        console.log("Logged in - ", req.session.user);
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

//Send schema_id to Issuer, using API
//Can send * from users in future
// app.get("/users", (req, res) => {
//     // const storedUsername = localStorage.getItem('username');
//     const username = req.body.username;
//     console.log("Name = ", username);

//     // const query = `SELECT schema_id FROM users WHERE username = ${storedUsername}`;
//     const query = `SELECT schema_id FROM users WHERE username = ?`;
//     db.query(query, [username], (err, result) => {
//         if (err) return res.json(err);
//         return res.json(result);
//     });
// });


//New try
app.get("/users", (req, res) => {
    const username = req.query.username; // Get the id from the request query parameters
    const query = `SELECT schema_id FROM users WHERE id = ?`;

    console.log("Name = ", username);

    db.query(query, [username], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
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