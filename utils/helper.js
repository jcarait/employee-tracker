// import config connection to sql database
const db = require("../config/connection")

// Helper function for display SQL data into console table
const displayTable = (sql) => {
    db.query(sql, (err, res) => {
       if (err)
           console.log(err);
       console.table(res);
   });
}

module.exports = displayTable;