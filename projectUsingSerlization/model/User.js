const { Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const Joi = require("joi");
let regrex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/);
const User = sequelize.define(
  "user",
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
function validate(user) {
  console.log(user);
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(18).pattern(regrex),
  });
  console.log(schema.email);
  return schema.validate(user);
}
module.exports = { User, validate };
