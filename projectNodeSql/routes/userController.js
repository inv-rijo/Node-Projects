const express = require("express");
const router = express.Router();
const mysqldb = require("../db/database");
const bcrypt = require("bcrypt");
const util = require("util");
const query = util.promisify(mysqldb.query).bind(mysqldb);
const jwt = require("jsonwebtoken");
const moment = require("moment");
const time = require("../Utils/Time")
let TOKEN_KEY = "123456789";
const ROLES = {
  ADMIN: "0",
  USER: "1",
};
const STATUS = {
  ACTIVE: "1",
  NOTACTIVE: "0",
};

router.post("/login", async (req, res) => {
  let RawPassword = null;
  let data = null;
  if (req.body.password.length == 0) {
    res.send("password is required ").status(500);
  } else if (req.body.email.length == 0) {
    res.send(" email is required").status(500);
  } else {
    try {
      const value = await query("select * from user where email = ?", [
        req.body.email,
      ]);
      if (value.length == 0) {
        res.status(500).send("User Not Found");
      } else {
        RawPassword = value[0].password;
        data = value;
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (await bcrypt.compare(req.body.password, RawPassword)) {
    console.log(data[0].user_id);
    const accesstoken = jwt.sign(
      {
        user_id: data[0].user_id,
        user_role: data[0].roles,
        purpose: "ACCESS_TOKEN",
      },
      TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    const refreshToken = jwt.sign(
      { user_id: data.id, user_role: data.roles_id, purpose: "refreshToken" },
      TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );
    res
      .json({
        data,
        accesstoken,
        refreshToken,
      })
      .status(200);
  } else {
    res.send("sorry passowrd").status(500);
  }
});
router.get("/", async (req, res) => {
  mysqldb.query("select * from user", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else console.log(err);
  });
});
router.get("/:id", async (req, res) => {
  mysqldb.query(
    "select * from user where user_id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else console.log(err);
    }
  );
});
router.delete("/:id", async (req, res) => {
  mysqldb.query(
    "update user set status = 0,updated_date=?  where user_id=?",
    [time,req.params.id],
    (err, rows, fields) => {
      if (!err) res.json("deleted successfully");
      else console.log(err);
    }
  );
});
router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let body = req.body;
  let time =moment().format("YYYY-MM-DD hh:mm:s[]")
  console.log(time);
  mysqldb.query(
    "insert into user (email,name,password,status,roles,created_date,updated_date) values (?,?,?,?,?,?,?)",
    [body.email, body.name, hashedPassword, STATUS.ACTIVE, ROLES.ADMIN,time,time],
    (err, rows, fields) => {
      if (!err) {
        console.log(req.body);
        res.json("added successfully");
      } else console.log(err);
    }
  );
});
router.put("/:id", async (req, res) => {
  let body = req.body;
  mysqldb.query(
    "update user set email=?,name=?,password=?,updated_date where user_id=?",
    [body.email, body.name, body.password, req.params.id,time],
    (err, rows, fields) => {
      if (!err) {
        console.log(req.body);
        res.json("updated successfully");
      } else console.log(err);
    }
  );
});
module.exports = router;
