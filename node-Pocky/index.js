// Include necessary lib
require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Header to allow Methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

// include mysql lib
var mysql = require("mysql");

// connect to database
/**
 * env is obj
 * DB_SERVER , DB_USER , DB_PASS , DB_DATABASE are attributes of env 
 * which inside .env file
 */
var db = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
db.connect(function (err) {
  if (err) throw console.log(err);
  console.log("Connected!");
});

/**
 * Add account
 * To add new user
 * Input: username password
 * Output:
 * Author: Athiruj
 * Create date: 25/02/2020 
 */
app.post("/account-register", (req, res) => {
  let sql = `
    INSERT INTO account (ac_username,ac_password)
    VALUES ("${req.body.username}","${req.body.password}");
  `
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
})

/**
 * Get all account
 * To get all account
 * Input: username password
 * Output:
 * Author: Athiruj
 * Create date: 25/02/2020 
 */
app.get("/account-get-all", (req, res) => {
  let sql = ` SELECT * FROM account ;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Get an account for login by username and password
 * To get an account for login verification
 * Input: username password
 * Output: id username password
 * Author: Athiruj
 * Create date: 27/02/2020 
 */
app.post("/account-login", (req, res) => {
  let sql = ` SELECT * FROM account 
              WHERE ac_username = '${req.body.username}' 
              AND ac_password = '${req.body.password}' ;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


/**
 * Get an account by username
 * To get an exist username 
 * Input: username
 * Output: id
 * Author: Athiruj
 * Create date: 28/02/2020 
 */
app.post("/account-get-username", (req, res) => {
  let sql = ` SELECT ac_id FROM account 
              WHERE ac_username = '${req.body.username}';`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});

/**
 * Remove wallet by id
 * To remove get wallet by id
 * Input: wal_id
 * Output: -
 * Author: Athiruj
 * Create date: 03/03/2020 
 */
app.post("wallet-remove-by-id", (req, res) => {
  let sql = ` UPDATE wallet
              SET wal_status = 'N'
              WHERE wal_id = '${req.body.wal_id}';`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });

});

 /**
 * Remove wallet by id
 * To remove get wallet by id
 * Input: wal_id
 * Output: -
 * Author: Athiruj
 * Create date: 03/03/2020 
 */
app.post("wallet-remove-by-id", (req, res) => {
  let sql = ` UPDATE wallet
              SET wal_status = "${req.body.wal_id}"
              WHERE wal_id = "${req.body.wal_id}";`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });

});