const mongoose = require("mongoose");
const ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
};
const STATUS = {
  ACTIVE: "1",
  NOTACTIVE: "0",
};
const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    max: 16,
    min: 8,
  },
  role:{
    type:String
  },
  status:{
    type:String,
    default: STATUS.ACTIVE
  },
  accessToken:{
    type:String,
  },
  refreshToken:{
    type:String,
  }

  },{timestamps:true});

let User =  mongoose.model("User", userSchema);
module.exports =  { User,ROLES,STATUS }