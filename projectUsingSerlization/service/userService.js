const express = require("express");
const router = express.Router();
const {User,validate} = require("../model/User");
const bcrypt = require("bcrypt");
const { UserView, UserListView, loginView } = require("../Views/UserView");
const jwt = require("jsonwebtoken");

let TOKEN_KEY = "12345678";

//get user by business logic view through class Userview
//findbypk is primary key is always unique key so by that find the user using that unique key
let getUserByService = async (id) => {
  let users = [];
  try {
    users = await User.findByPk(id);
  } catch (error) {
    console.log(error);
  }
  return new UserView(users);
};
//get users list using business logic and view through class
//findall is used for print whole set of users
let getUsersByService = async () => {
  let userslist = [];
  try {
    userslist = await User.findAll();
  } catch (error) {
    console.log(error);
  }
  return new UserListView(userslist);
};
//add new user using create which is predefined fuction used for add user
let postUser = async (name, email, password) => {
  try {
    console.log("keriyo?");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
  } catch (err) {
    res.send("errror" + err);
  }
};
//service class of login which connect with normal business logic
/*findOne is used to find spec that user which need a condition for logic in here where:{email} is used which used to find that user spec user*/
let LoginUser = async (req, res) => {
  let RawPassword = null;
  let data = null;
  if (req.body.password == null) {
    res.send("password is required ").status(500);
  } else if (req.body.email == null) {
    res.send(" email is required").status(500);
  } else {
    try {
      const value = await User.findOne({ where: { email: req.body.email } });
      if (value == null) {
        res.status(500).send("User Not Found");
      } else {
        RawPassword = value.password;
        console.log(RawPassword);
        data = value;
        console.log(data);
        if (await bcrypt.compare(req.body.password, RawPassword)) {
          console.log(data.user_id);
          const accesstoken = jwt.sign(
            {
              user_id: data.user_id,
              purpose: "ACCESS_TOKEN",
            },
            TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          const refreshToken = jwt.sign(
            { user_id: data.id, purpose: "refreshToken" },
            TOKEN_KEY,
            {
              expiresIn: "1d",
            }
          );
          let dataUser = await new loginView(data, accesstoken, refreshToken);
          res.send(dataUser).status(200);
        } else {
          res.send("sorry passowrd").status(500);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { getUserByService, getUsersByService, postUser, LoginUser };
