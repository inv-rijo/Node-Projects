const express = require("express");
const User = require("./model/User");
const userController = require("./Router/userRouter");
const loginController = require("./Controller/loginController");
const cors = require("cors");
const app = express();

//cover up cross orgin
app.use(cors());
//print by json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cover all the route
app.use("/users", userController);
app.use("/login", loginController);
//listen to that port
let server =app.listen(3002, () => {
  let abcd="http://localhost:"
  console.log("Server started 😀");
});
