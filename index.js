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
app.post("/account-add",(req,res)=>{
  let sql =  `
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

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
