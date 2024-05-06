// Importing necessary modules
import express from "express"; // 
import mysql from "mysql";
import cors from 'cors';
import crypto from 'crypto';

// Creating an instance of Express application
const app = express()

// Parse incoming request bodies as JSON
app.use(express.json())

// Middleware to enable cors
app.use(cors())

// Creating a connection to the MySQL database
const db = mysql.createConnection({
    user: "admin",
    host: "wvuride-db1.c9w2o8komlq5.us-east-2.rds.amazonaws.com",
    password: "password",
    database: "metadata"
})

// Connecting to the MySQL database
db.connect((err) => {
    // Indicate error if connection failed
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    // Otherwise succesful connection
    console.log('Connected to MySQL database as id ' + db.threadId);
});

// Endpoint for checking backend connection
app.get("/", (req, res) => {
    res.json("Successfully connected to backend");
})

// Endpoint for retrieving all users
app.get("/users", (req, res) => {
    // SQL query to select all users present in the db
    const q = "SELECT * FROM userInfo";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
})

// Endpoint for creating a new user
app.post("/users", (req, res) => {
    const q = "INSERT INTO userInfo (`fullName`, `username`, `email`, `password`) VALUES (?)"
    // Password hashing implementation
    var hash = crypto.createHash('sha256')
    var saltedPassword = req.body.password + 'carpool'
    hash.update(saltedPassword)
    var hashedPassword = hash.digest('hex')
    const values = [
        // All fields in the database table for the user information input in the login form
        req.body.fullName,
        req.body.username,
        req.body.email,
        // Return the hashed passwords to the db table
        hashedPassword,
    ];
    // Indicate success if the user is created
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("User has been created")
    })
})

// Endpoint for user login
app.post("/login", (req, res) => {
    // Use the previous hashing password  implementation
    var hash = crypto.createHash('sha256')
    // Checks if the salted password is similar to the password input by the user in the login form
    var saltedPassword = req.body.password + 'carpool'
    hash.update(saltedPassword)
    var hashedPassword = hash.digest('hex')
    console.log(hashedPassword)
    // Selects the specific user logging in and redirects them to homif its succesful
    const q = `SELECT * FROM userInfo WHERE username = '${req.body.username}' AND password = '${hashedPassword}'`
    // Succseful if the user exists in the db
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/login", (req, res) => {
    // Creating a SHA-256 hash object
    // Similar Hashing implementation
    var hash = crypto.createHash('sha256')
    var saltedPassword = 'Dixie119' + 'carpool'
    hash.update(saltedPassword)
    var hashedPassword = hash.digest('hex')
    const q = `SELECT * FROM userInfo WHERE username = 'DizzyDigga1' AND password = '${hashedPassword}'`

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Endpoint for generating a token
app.post("/token", (req, res) => {
    // Creating a SHA-256 hash object
    var hash = crypto.createHash('sha256')
    var preHash = req.body.username + 'This is a token'
    hash.update(preHash)
    // Generating the hashed token as a hexadecimal string
    var hashedToken = hash.digest('hex')
    // Sending the hashed token as the response
    return res.send(hashedToken)
})

// Endpoint for checking the emails for the users
app.post("/checkEmail", (req, res) => {
    const q = `SELECT * FROM userInfo WHERE email = '${req.body.email}'`

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/checkEmail", (req, res) => {
    const q = "SELECT * FROM userInfo WHERE email = 'nrg00007@mix.wvu.edu'"

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// End point for retrieving all the posts found in the database
app.get("/retrieve5Posts", (req, res) => {
    // SQL query to select all from postsInfo table
    const q = "SELECT * FROM postsInfo"

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Endpoint for posting a new post
app.post("/postAPost", (req, res) => {
    // SQL Query to insert information about the posts into the database
    const q = `INSERT INTO postsInfo (postAuth, postFrom, postTo, postDesc, postGas, postTitle) VALUES ('${req.body.username}', '${req.body.from}', '${req.body.to}', '${req.body.desc}', ${req.body.gasFlag}, '${req.body.title}')`

    // Execute the SQL Query to insert the new post
    db.query(q, (err, data) => {
        if (err) return res.json(err) // Unsuccessful creation
        return res.json(data) // Successful
    })
})

// Endpoint for posting a new post
app.get("/postAPost", (req, res) => {
    // SQL Query to insert information about the posts into the database
    const q = "INSERT INTO postsInfo (postAuth, postFrom, postTo, postDesc, postTitle, postGas) VALUES ('DizzyDigga', 'West Run', 'The Foundry', 'If anyone would like to go to church on Sunday morning I would be more than willing to take some people so we can all save on gas', 'Church rides', 0)"

    // Execute the SQL Query to insert the new post
    db.query(q, (err, data) => {
        if (err) return res.json(err) // Unsuccessful creation
        return res.json(data) // Successful
    })
})

// Endpoint for searching posts based on criteria
app.post("/searchPosts", (req, res) => {
    var toAdd = "postsInfo"
    // Checking if search criteria are provided
    if ((req.body.to !== "" || req.body.from !== "" || req.body.gas !== -1)) {
        // Adding WHERE clause to the SQL query if 'to' location criteria is provided
        if (req.body.to !== "") {
            toAdd += ` WHERE postTo = '${req.body.to}'`
        }
        // Adding WHERE clause or AND clause based on whether 'from' criteria is the first condition
        if (req.body.from !== "") {
            if (toAdd === "postsInfo") {
                toAdd += ` WHERE postFrom = '${req.body.from}'`
            }
            else {
                toAdd += ` AND postFrom = '${req.body.from}'`
            }
        }
        // Adding WHERE clause or AND clause based on whether 'gas' criteria is the first condition
        if (req.body.gas !== -1) {
            if (toAdd === "postsInfo") {
                toAdd += ` WHERE postGas = ${req.body.gas}`
            }
            else {
                toAdd += ` AND postGas = ${req.body.gas}`
            }
        }
    }
    // Constructing the SQL query to search posts based on criteria
    const q = `SELECT * FROM ` + toAdd

    // Executing the SQL query to search posts
    db.query(q, (err, data) => {
        if (err) return res.json(err) // Unsuccesful
        return res.json(data) // Successful
    })
})

// Endpoint for changing user password
app.post("/changePassword", (req, res) => {
    // Similar hashing password implementation
    // Creating a SHA-256 hash object
    var hash = crypto.createHash('sha256')
    var saltedPassword = req.body.password + 'carpool'
    hash.update(saltedPassword)
    var hashedPassword = hash.digest('hex')
    console.log(hashedPassword)
    // SQL Query to update the user's password in the database
    const q = `UPDATE userInfo SET password = '${hashedPassword}' WHERE username = '${req.body.username}'`

    // Executing the SQL query to update the user's password
    db.query(q, (err, data) => {
        if (err) return res.json(err) // Unsuccesful
        return res.json(data) // Successful
    })
})


// Connect the database to local port 8800
app.listen(8800, () => {
    console.log("Backend Connected to local port 8800")
})

