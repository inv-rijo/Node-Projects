const express = require("express");
const router = express.Router();

const {
  GetUser,
  GetUsers,
  DeleteUser,
  PatchUser,
  AddUser,
  UpdateUser,
  emailSender,
  GetCsv,
  GetPaginate
} = require("../controllers/userController");
// all are export in controller page !
router.get("/getcsv",GetCsv)
router.get("/getUsers", GetPaginate);
router.get("/email",emailSender)
router.post("/", AddUser);
router.get("/", GetUsers);
router.get("/:id", GetUser);
router.delete("/:id", DeleteUser);
router.patch("/:id", PatchUser);
router.put("/:id", UpdateUser);

module.exports = router;
