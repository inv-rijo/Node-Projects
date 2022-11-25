const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {LoginUser,emailSender} = require("../controllers/userController")

router.post("/",LoginUser);
module.exports = router;