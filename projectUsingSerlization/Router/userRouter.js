const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const UserListView = require("../Views/UserView");
const {getUsers,postUsers,getUser} =require('../Controller/userController')

//this routing willl route to the controllers


//route get users list to the controller 
router.get("/", getUsers);
//route post users list to the controller 
router.post("/", postUsers);
//route get user list to the controller 
router.get("/:id",getUser)

//export the router module
module.exports = router;
