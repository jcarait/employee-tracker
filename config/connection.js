const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 3001,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_tracker_db"
});

module.exports = db;