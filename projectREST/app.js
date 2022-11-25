const express = require("express");
// const con = require("../projectREST/db/database");
const userRouter = require("../projectREST/routes/user");
const loginRouter = require("../projectREST/routes/login");
const auth = require("../projectREST/Middleware/Auth");
//web-push
const webpush = require('web-push');

//body-parser
const bodyParser = require('body-parser');

//path
const path = require('path');
//using bodyparser
// app.use(bodyParser.json())
// connect expresss 
const app = express();
const schedule = require('node-schedule');
// scheduler to console log in every 10 sec 
const scheduler = schedule.scheduleJob('*/10 * * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
// connect with mongo db which has be export in another component
// const connect = con.connection;
//connect the mongo db anc  processs on open it
// connect.on("open", () => {
//   console.log("db connected....");
// });
//express to json format




const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Innovature@123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});









app.use(express.json());
//post welcome using auth or verify using token
app.post("/welcome", auth.verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
//it will routes all the users
app.use("/users", userRouter);
//it will routes to login
app.use("/login", loginRouter);

//storing the keys in variables
const publicVapidKey = process.env.PUBLICVALIDKEY;
const privateVapidKey = process.env.PRIVATEVALIDKEY;
//setting vapid keys details
webpush.setVapidDetails('mailto:mercymeave@section.com', publicVapidKey,privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res)=>{
  //get push subscription object from the request
  const subscription = req.body;

  //send status 201 for the request
  res.status(201).json({})

  //create paylod: specified the detals of the push notification
  const payload = JSON.stringify({title: 'Section.io Push Notification' });

  //pass the object into sendNotification fucntion and catch any error
  webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})














//it will listen to  3000 port 
app.listen(3000, () => {
  console.log("server started..");
});
