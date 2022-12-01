const express = require("express");
const router = express.Router();
const {User} = require("../model/User");
const bcrypt = require("bcrypt");
const { LoginUser } = require("../service/userService");

//pass the req and res through service for login
router.post("/", async (req, res) => {
  await LoginUser(req, res);
});
module.exports = router;
