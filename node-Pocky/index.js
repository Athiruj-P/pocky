// Include necessary lib
require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var dateTime = require('./dateTime');

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
    VALUES ("${req.body.username}","${req.body.password}");`
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    let sql = ` SELECT ac_id FROM account WHERE ac_username = '${req.body.username}';`
    query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
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

/**
 * Get an wallet by ac_id
 * To get the user's wallet  
 * Input: ac_id
 * Output: id name money ac_id wal_cur_id
 * Author: Athiruj
 * Create date: 02/03/2020 
 */
app.post("/wallet-get-by-id", (req, res) => {
  let sql = ` SELECT * FROM wallet
              INNER JOIN currency ON cur_id = wal_cur_id
              WHERE wal_ac_id = '${req.body.ac_id}'
              AND wal_status = 'Y'
              ORDER BY wal_cur_id;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Add wallet
 * To add new user,s wallet
 * Input: name money ac_id wal_cur_id
 * Output: -
 * Author: Athiruj
 * Create date: 02/03/2020 
 */
app.post("/wallet-add", (req, res) => {
  let sql = `
    INSERT INTO wallet (wal_name,wal_money,wal_ac_id,wal_cur_id)
    VALUES ("${req.body.wal_name}","${req.body.wal_money}","${req.body.wal_ac_id}","${req.body.wal_cur_id}");
  `
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
})

/**
 * Get transaction by tran id
 * To get a transaction of the wallet
 * Input: tran_id
 * Output: transaction
 * Author: Athiruj
 * Create date: 02/03/2020 
 */
app.post("/transaction-get-by-tran-id", (req, res) => {
  let sql = ` SELECT * FROM transaction 
              WHERE tran_id = '${req.body.tran_id}';`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Get all currency
 * To get all currencies
 * Input: -
 * Output: currencies
 * Author: Athiruj
 * Create date: 02/03/2020 
 */
app.get("/currency-get-all", (req, res) => {
  let sql = ` SELECT * FROM currency
              ORDER BY cur_id;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Remove wallet by id
 * To remove wallet by id
 * Input: wal_id
 * Output: -
 * Author: Athiruj
 * Create date: 03/03/2020 
 */
app.post("/wallet-remove-by-id", (req, res) => {
  let sql = ` UPDATE wallet
              SET wal_status = 'N'
              WHERE wal_id ='${req.body.wal_id}';`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Rename wallet by id
 * To rename wallet by id
 * Input: wal_id
 * Output: -
 * Author: Athiruj
 * Create date: 03/03/2020 
 */
app.post("/wallet-rename-by-id", (req, res) => {
  let sql = ` UPDATE wallet
              SET wal_name ="${req.body.wal_name}"
              WHERE wal_id ="${req.body.wal_id}";`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Update wallet's balance
 * To update wallet's balance
 * Input: wal_id , wal_money
 * Output: -
 * Author: Athiruj
 * Create date: 03/03/2020 
 */
app.post("/wallet-set-balance-by-id", (req, res) => {
  let sql = ` UPDATE wallet
              SET wal_money ="${req.body.wal_money}"
              WHERE wal_id ="${req.body.wal_id}";`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Add transaction
 * To add new transaction for the wallet 
 * Input: tran_name tran_name tran_date tran_wal_id tran_status
 * Output: -
 * Author: Athiruj
 * Create date: 07/03/2020
 */
app.post("/transaction-add", (req, res) => {
  let sql = ` INSERT INTO transaction (tran_name,tran_type,tran_amount,tran_date,tran_wal_id)
              VALUES ("${req.body.tran_name}","${req.body.tran_type}","${req.body.tran_amount}","${dateTime.dateTime()}","${req.body.tran_wal_id}");`;
  let query = db.query(sql, (err, val) => {
    if (err) throw err;
    let sql = ` SELECT * FROM transaction WHERE tran_id = '${val.insertId}';`
    query = db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
});

/**
 * get all transaction by wal_id
 * To all transaction of the wallet 
 * Input: wal_id
 * Output: -
 * Author: Athiruj
 * Create date: 07/03/2020 
 */
app.post("/transaction-get-all-by-wal-id", (req, res) => {
  let sql = ` SELECT * FROM transaction
              WHERE tran_wal_id = "${req.body.wal_id}"
              AND tran_status = 'Y'
              ORDER BY tran_date DESC;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Update transaction by tran_id
 * To change a value of transaction's attribute
 * Input: tran_id
 * Output: -
 * Author: Athiruj
 * Create date: 07/03/2020 
 */
app.post("/transaction-edit-by-id", (req, res) => {
  let sql = ` UPDATE transaction
              SET tran_name ="${req.body.tran_name}",
                  tran_type  ="${req.body.tran_type}",
                  tran_amount ="${req.body.tran_amount}"
              WHERE tran_id ="${req.body.tran_id}"; `;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Remove transaction by id
 * To remove transaction by id
 * Input: tran_id
 * Output: -
 * Author: Athiruj
 * Create date: 03/03/2020 
 */
app.post("/transaction-remove-by-id", (req, res) => {
  let sql = ` UPDATE transaction
              SET tran_status = 'N'
              WHERE tran_id ='${req.body.tran_id}';`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * get years for option
 * To all transaction of the wallet 
 * Input: wal_id
 * Output: -
 * Author: Athiruj
 * Create date: 07/03/2020 
 */
app.post("/transaction-get-all-by-wal-id", (req, res) => {
  let sql = ` SELECT * FROM transaction
              WHERE tran_wal_id = "${req.body.wal_id}"
              AND tran_status = 'Y'
              ORDER BY tran_date DESC;`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});

/**
 * Get an year by wal_id, date
 * To get an summary of TotalIncome
 * Input: wal_id, date
 * Output: SUM(tran_amount)
 * Author: Wannapa
 * Create date: 11/03/2020 
 */
app.post("/summary-get-year", (req, res) => {
  let sql = ` SELECT distinct YEAR(tran_date) AS Year FROM transaction
              WHERE tran_wal_id = '${req.body.wal_id}' 
              AND tran_status = 'Y' `;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Get an income by wal_id, date
 * To get an summary of TotalIncome
 * Input: wal_id, date
 * Output: SUM(tran_amount)
 * Author: Wannapa
 * Create date: 11/03/2020 
 */
app.post("/summary-get-TotalIncome", (req, res) => {
  let sql = ` SELECT SUM(tran_amount) AS TotalIncome FROM transaction
              WHERE tran_type = 1 AND tran_wal_id = '${req.body.wal_id}' 
              AND tran_date LIKE '${req.body.date}%' 
              AND tran_status = 'Y'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/**
 * Get an expense by wal_id, date
 * To get an summary of TotalExpense
 * Input: wal_id, date
 * Output: SUM(tran_amount)
 * Author: Wannapa
 * Create date: 11/03/2020 
 */
app.post("/summary-get-TotalExpense", (req, res) => {
  let sql = ` SELECT SUM(tran_amount) AS TotalExpense FROM transaction
              WHERE tran_type = 2 AND tran_wal_id = '${req.body.wal_id}' 
              AND tran_date LIKE '${req.body.date}%' 
              AND tran_status = 'Y'`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});