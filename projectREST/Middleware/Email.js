const nodemailer = require('nodemailer');
require('dotenv').config();
const MailSender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILID,
      pass: process.env.EMAILPASS
    }
  });
  module.exports=MailSender;