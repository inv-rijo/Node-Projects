const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, ROLES, STATUS } = require("../models/user");
const jwt = require("jsonwebtoken");
const process = require("process");
const { env } = require("process");
require("dotenv").config();
const nodemailer = require("nodemailer");
const MailSender = require("../Middleware/Email");
const { log } = require("console");
const json2csv = require("json2csv").Parser;
const {pager} =require("../Middleware/Pager")

let TOKEN_KEY = "123456789";
//get all users from db which status =1 
const GetUsers = async (req, res) => {
  console.log("get");
  try {
    const users = await User.find({ status: 1 });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.send("Error" + err);
  }
};
// getcsv by json2csv which find status =1
const GetCsv = async (req, res) => {
  try {
    const users = await User.find({ status: 1 });
    const csvString = new json2csv(users);
    res.setHeader(
      "Content-disposition",
      "attachment; filename=shifts-report.csv"
    );
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvString);
  } catch (err) {
    console.log(err);
    res.send("Error" + err).status(500);
  }
};
// get user by id =findbyId  
const GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.status == 0) {
      res.status(500).json("Not Found");
    } else {
      res.json(user).status(200);
    }
  } catch (err) {
    res.send("Error" + err);
  }
};
//soft delete user by id 
const DeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.params.id);
    if (user.status == 0) {
      console.log(user);
      res.status(500).json("Not Found");
    } else {
      user.status = STATUS.NOTACTIVE;
      user.email = "del_" + user.email;
      const data = await user.save();
    }
    res.status(200).json("User Is Deleteed");
  } catch (err) {
    res.send("Error" + err);
  }
};
// patch the user by user id
const PatchUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { name, email, password } = req.body;
    if (name) user.name = req.body.name;
    if (email) user.email = req.body.email;
    if (password) user.password = req.body.password;

    const userPatch = await user.save();
    res.send(userPatch);
  } catch (err) {
    res.send("Error" + err);
  }
};
// add a user
const AddUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: ROLES.ADMIN,
    });
    console.log();
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.send("errror" + err);
  }
};
//update user by findbyId and update
const UpdateUser = async (req, res) => {
  console.log("hi");
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated succesfully");
  } catch (err) {
    res.send("Error" + err);
  }
};
//login with credrialisn
const LoginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    res.status(500).send("User Not Found");
  } else {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accesstoken = jwt.sign(
          { user_id: user.id, user_role: user.role, purpose: "ACCESS_TOKEN" },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        const refreshToken = jwt.sign(
          { user_id: user.id, user_role: user.role, purpose: "refreshToken" },
          TOKEN_KEY,
          {
            expiresIn: "1d",
          }
        );
        user.accessToken = accesstoken;
        user.refreshToken = refreshToken;

        res.json(user);
      } else {
        res.status(500).send("Not Allow");
      }
    } catch {
      res.status(500).send();
    }
  }
};
//send an email using nodemailer which mail and pass are saved .env 
const emailSender = async (req, res) => {
  let mailOptions = {
    from: process.env.EMAILID,
    to: "bigara6761@kixotic.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };
  MailSender.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("successfully send mail");
    }
    res.end();
  });
};
//get paginate and search using pager middleware
const GetPaginate=async (req, res) => {
  try {
    let keyWord = "";
    if (req.query.keyWord) {
      keyWord = req.query.keyWord;
    }
    const result = await  pager(
      User,
      req.query.page,
      req.query.limit,
      keyWord
    );
    res.json(result);
  } catch (err) {
    res.send("Error " + err);
  }
}

module.exports = {
  AddUser,
  GetUser,
  GetUsers,
  DeleteUser,
  PatchUser,
  LoginUser,
  UpdateUser,
  emailSender,
  GetCsv,
  GetPaginate
};
