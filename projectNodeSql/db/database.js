const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Innovature@123",
  database: "crud",
});
module.exports=con
