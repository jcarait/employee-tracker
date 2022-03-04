const mysql = require("mysql2");
const promptUser = require("../app");
require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db"
});



module.exports = db;

