const express = require("express");
const router = express.Router();
const { validate } = require("../model/User");
const bcrypt = require("bcrypt");
const {
  getUserByService,
  getUsersByService,
  postUser,
} = require("../service/userService");

//controller pass the req and res to service where business logic works

//getusers which passs through the service and get the responses send the respones
let getUsers = async (req, res) => {
  let getUserslist = await getUsersByService();
  res.send(getUserslist);
};
//getuser which passs through the service and get the responses send the respones
let getUser = async (req, res) => {
  let getUse = await getUserByService(req.params.id);
  res.send(getUse);
};
//post users which passs through the service and get the responses send the respones
let postUsers = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) res.send(error.details[0].message);
    else
    await postUser(req.body.name, req.body.email, req.body.password);
    res.send("new user added");
  } catch (error) {}
};
module.exports = { getUsers, postUsers, getUser };
