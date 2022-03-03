const mysql = require("mysql2");
require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db"
});

// error handler if connection fails
db.connect(function(err) {
    if (err) {
        console.log(err)
        throw err};
    console.log("Connected!");
    
  });

module.exports = db;