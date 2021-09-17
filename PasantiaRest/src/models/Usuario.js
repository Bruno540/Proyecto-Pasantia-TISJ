const Sequelize = require("sequelize");
const { sequelize } = require('../database/database');
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define('Usuario', {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, 
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    //tableName: 'usuario',
    paranoid: true,
    hooks: {
      beforeCreate: async (user, options) => {
        //var pass = await crypto.randomBytes(10).toString('hex');
        await bcrypt.hash(user.password, 12).then(hash => {
          user.password = hash;
          //enviarEmailConfirmacion(user.email, id);
        })
        .catch(err => {
          console.log(err);
          throw new Error();
        });
      },
      afterCreate: async(user, options) =>{
        await user.reload();
      }
    },
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      password:{
        attributes: { include: ['password'] }
      }
    }
  });
  
  module.exports = Usuario;
