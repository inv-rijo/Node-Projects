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
try {
    sequelize.authenticate().then(() => {
        console.info('IN Database connected.')
       })
       .catch(err => {
        console.error('ERROR - Unable to connect to the database:', err)
       })
} catch (error) {
    console.log(error);
}
module.exports=sequelize;