const express = require("express");
const mysqldb = require("./db/database");
const userRouter = require("./routes/userController");
const auth = require("./Middleware/Auth");
const multer = require("multer");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();
const app = express();

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.env.UPLOADPATH);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

mysqldb.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json());
app.use("/users", userRouter);
app.get("/welcome", auth.verifyToken, auth.adminAccess, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.post("/api/upload", upload.single("profile"), function (req, res) {
  if (!req.file) {
    console.log("No file received");
    let message = "Error! in image upload.";
    res.send(message).status(400);
  } else {
    console.log("file received");
    let request = req.file;
    let sqlque = "insert into file (id,name,type,size) values (0,?,?,?)";

    mysqldb.query(
      sqlque,
      [request.filename, request.mimetype, request.size],
      function (err, result) {
        if (!err) {
          let message = "Successfully! uploaded";
          res.send(message).status(200);
        } else console.log(err);
      }
    );
  }
});
app.listen(3000, () => {
  console.log("server started..");
});
