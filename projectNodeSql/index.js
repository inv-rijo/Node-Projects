const express = require("express");
const mysqldb = require("./db/database");
const userRouter = require("./routes/userController");
const auth = require("./Middleware/Auth");
const app = express();

mysqldb.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(express.json());
app.use("/users", userRouter);
app.get("/welcome",auth.verifyToken, auth.adminAccess, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.listen(3000, () => {
  console.log("server started..");
});
