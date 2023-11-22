const mysql = require("mysql");
require('dotenv').config();
// Create a connection to the database
const connection = mysql.createConnection({
  
  /*
  host: process.env.DBHOST,
  user: "Shin",
  password: null,
  database: "streamingdb"
  */
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB

});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;