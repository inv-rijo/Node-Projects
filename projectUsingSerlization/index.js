const express = require("express");
const app = express();
app.use(express.json());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async(req,res)=>{
   
});
app.listen(3000, () => {
  console.log("server started..");
});
