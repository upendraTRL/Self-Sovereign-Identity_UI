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
require('dotenv').config();

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


//Registration API
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const usertype = req.body.usertype;
    const displayname = req.body.displayname;

    //Default entry
    const schema_id = "0";
    const cred_def_id = "0";
    const credentials = "0";

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (username, password, usertype, displayname, schema_id, cred_def_id, credentials) VALUES (?,?,?,?,?,?,?)",
            [username, hash, usertype, displayname, schema_id, cred_def_id, credentials],
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

//Issuer New Card API
app.post("/newcard", (req, res) => {
    const schema_id = req.body.schema_id;
    const cred_def_id = req.body.cred_def_id;
    const username = req.body.username;
    console.log("Valuesss - ", schema_id, cred_def_id);

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
                        console.log("All data = ", result);

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
// app.get("/users", (req, res) => {
//     const username = req.query.username; // Get the id from the request query parameters
//     const query = `SELECT schema_id FROM users WHERE username = ?`;

//     console.log("Name = ", username);

//     db.query(query, [username], (err, result) => {
//         if (err) {
//             return res.json(err);
//         }
//         return res.json(result);
//     });
// });

//Fetch all user details, API
app.get("/users", (req, res) => {
    const username = req.query.username; // Assuming the username is included in the request query parameters

    const query = `SELECT * FROM users WHERE username = ?`;

    console.log("Name = ", username);

    db.query(query, [username], (err, result) => {
        if (err) {
            return res.json(err);
        }

        console.log("result = ", result);
        return res.json(result);
    });
});

//Holder, Connection table data fetch, API
app.get("/toholder", (req, res) => {
    const username = req.query.usernameH;
    console.log("connection table = ", username);

    const query = `SELECT connection_name FROM connection WHERE username = ?`;


    db.query(query, [username], (err, result) => {
        if (err) {
            return res.json(err);
        }

        console.log("result = ", result);
        return res.json(result);
    });
});



//////////Gaurav's API///////////
///  axios for remote API call
const axios = require('axios');


//create connection invitation
app.post("/connections/create", (req, res) => {

    console.log("Inside create connections")
    console.log("req ttyype ::::", typeof (req));
    console.log("req ::::", req.body.userPort);
    console.log("Hname ::::", req.body.connection_name);
    // console.log("Hname ::::", req.body.id);
    console.log("Hname ::::", req.body.username);
    const data = req.body.userPort
    axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/connections/create-invitation`, {
        data
    })
        .then(response => {
            console.log("response from node ::::", response.data);
            console.log("End of respose --------------");

            //Store data in connection table
            const id = req.body.id;
            const connection_name = req.body.connection_name;
            const username = req.body.username;
            const connection_id = response.data.connection_id;

            console.log("This is log", id, username, connection_id, connection_name);

            db.query(
                "INSERT INTO connection (connection_id, connection_name, id, username) VALUES (?,?,?,?)",
                [connection_id, connection_name, id, username],
                (err, result) => {
                    console.log(result);
                    if (typeof err === "object") {
                        console.log('Connection Added!');
                        res.status(200).send(response.data);
                    }
                    console.log(err);
                }
            );


        })
        .catch(error => {
            console.error(error);
        });



})

//receive connection invitation
app.post("/connections/receive", (req, res) => {

    console.log("userPort from holder: ", req.body);

    let data = {
        userPort: req.body.userPort,
        url: req.body.url
    }

    // const connection_id = response.data.connection_id;
    // const connection_name = req.body.verifierName;
    // const id = req.body.id;
    // const username = req.body.username;

    // db.query(
    //     "INSERT INTO connection (connection_id, connection_name, id, username) VALUES (?,?,?,?)",
    //     [connection_id, connection_name, id, username],
    //     (err, result) => {
    //         console.log(result);
    //         if (typeof err === "object") {
    //             console.log('Connection Added!  ');
    //             res.status(200).send(response.data);
    //         }
    //         console.log(err);
    //     }
    // );



    const connection_name = req.body.verifierName;
    const id = req.body.id;
    const username = req.body.username;



    axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/connections/receive-invitation`, data)
        .then(response => {
            console.log("response from node ::::", response.data);

            console.log("IDIDIDI - ", id);

            //Store data in connection table
            const connection_id = response.data.connection_id;


            if (connection_name == "") {
                console.log("Verifier Nameee - ", connection_name);
            } else {
                db.query(
                    "INSERT INTO connection (connection_id, connection_name, id, username) VALUES (?,?,?,?)",
                    [connection_id, connection_name, id, username],
                    (err, result) => {
                        console.log("Am I null?", result);
                        // if (typeof err === "object") {
                        //     console.log('Connection Added!');
                        //     res.status(200).send(response.data);
                        // }
                        //console.log(err);
                    }
                );

            }

        })
        .catch(error => {
            console.error(error);
        });
})


//send issue credential
app.post("/issue-credential/send", (req, res) => {

    let data = {}

    let id = req.body.id
    let userPort = req.body.userPort
    let connection_name = req.body.connection_name
    let cred_def_id = req.body.cred_def_id
    let name = req.body.name
    let dob = req.body.dob
    let gender = req.body.gender
    let address = req.body.address
    let connection_id = 'a'
    console.log("Data fetched - ", userPort, connection_name, cred_def_id, name, dob, gender, address);

    //Fetching connection_id from connection's table
    const query = `SELECT connection_id FROM connection WHERE id = ? AND connection_name = ?`;

    db.query(query, [id, connection_name], (err, result) => {
        if (err) {
            return res.json(err);
        }

        // connection_id = result[0].connection_id
        connection_id = result
        console.log("Connection ID for  = ", connection_id);
        // return res.json(result);

        data = {
            userPort: userPort,
            connection_id: connection_id[0].connection_id,
            cred_def_id: cred_def_id,
            name: name,
            dob: dob,
            gender: gender,
            address: address
        }

        console.log("Inside issue credential send", data)

        axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/issue-credential/send-credential`, data)

            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    });


})


///// get credential by connection id
app.get("/issue-credential/get-credentials", (req, res) => {

    const userPort = req.query.userPort
    const username = req.query.username
    console.log("Get Creds API ", userPort);
    const testSend = "Hello"

    // console.log("Inside issue credential send")
    axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/issue-credential/get-cred-records`,
        {
            userPort
        })

        .then(response => {
            console.log("Get Creds Responsssssssssssss -", (response.data.results));
            res.send(response.data.results,);
        })
        .catch(error => {
            console.error(error);
        });
})




app.post("/present-proof/send-proposal", (req, res) => {
    // userPort: req.body.userPort


    const userPort = req.body.userPort
    const name = req.body.name
    const dob = req.body.dob
    const address = req.body.address
    const gender = req.body.gender
    const credDefId = req.body.credDefId
    const connection_name = req.body.connection_name
    const id = req.body.id
    console.log("USER PROROT - ", userPort);

    //Fetching conn_id
    const query = `SELECT connection_id FROM connection WHERE id = ? AND connection_name = ?`;

    db.query(query, [id, connection_name], (err, result) => {
        if (err) {
            return res.json(err);
        }

        // connection_id = result[0].connection_id
        connection_id = result
        console.log("Connection ID for  = ", connection_id);
        // return res.json(result);

        let data = {
            userPort: userPort,
            connection_id: connection_id,
            credDefId: credDefId,
            name: name,
            dob: dob,
            gender: gender,
            address: address
        }

        console.log("Inside Present Proof send")
        axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/present-proof/send-proposal`, data)
            .then(response => {
                console.log("Present Proff worked - ", response.data);
            })
            .catch(error => {
                console.error(error);
            });

    });



})


app.get("/present-proof/records", (req, res) => {

    const userPort = req.query.userPort

    console.log("Inside issue credential send", userPort)
    axios.post(`http://${process.env.NEST_IP}:${process.env.NEST_PORT}/present-proof/records`,
        {
            userPort
        })

        .then(response => {
            console.log("Get Verifier Responsssssssssssss -", (response.data.results));
            res.send(response.data.results);
        })
        .catch(error => {
            console.error(error);
        });
})


app.listen(process.env.SERVER, () => {
    console.log("running server", process.env.SERVER);
});






// My Part
// "INSERT INTO users (username, password) VALUES (?,?)",

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'root',
//     database: 'loginsystem'
// });