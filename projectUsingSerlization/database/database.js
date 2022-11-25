const Sequelize = require("sequelize");
const Dbconfig = require("../DBconfig/dbconfig");
const sequelize = new Sequelize(
  Dbconfig.DATABASE,
  Dbconfig.USER,
  Dbconfig.PASSWORD,
  {
    host: Dbconfig.HOST,
    dialect: Dbconfig.DIALECT,
  }
);
const User=sequelize.define('user',{
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.DataTypes.STRING
    },
    password:{
        type: Sequelize.DataTypes.STRING
    }

},{
    freezeTableName: true
});

//post 

User.sync().then(()=>{
    console.log("Success");
}).catch((err)=>{
    console.log("errr"+err);
})
User.sync({alter:true}).then(()=>{
    return User.create({
        name:'Rijo',
        email:"Rijo@g.com",
        password:"Rijo@1234"
    });
}).catch((err)=>{
    console.log(err);
})

//get one


User.sync({alter:true}).then(()=>{
    return User.findOne({name:"Rijo"})
}).then((data)=>{
    console.log(data);
})