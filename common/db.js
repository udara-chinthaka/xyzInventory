"user strict"; //to write code cleaner https://www.w3schools.com/js/js_strict.asp

var mysql = require("mysql");

// local database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "xyz_inventory",
  multipleStatements: true, // try without this first - https://github.com/mysqljs/mysql#multiple-statement-queries -> go to this page and search for Multiple statement queries
  // insecureAuth: true
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Database connection success");
  }
});

module.exports = connection; // export database connection to use in other files
