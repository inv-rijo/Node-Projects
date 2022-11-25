const mongoose = require("mongoose");
const url = "mongodb://localhost/crud";
mongoose.connect(url, { useNewUrlParser: true });
//connect to database
const connection =mongoose.connection;
module.exports={connection};
