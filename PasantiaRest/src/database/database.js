const Sequelize = require('sequelize');

const sequelize = new Sequelize(
     process.env.DB_NAME,
     process.env.DB_USER,
     process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'postgres',
        typeValidation: true,
        dialectOptions: {
            encrypt: false,
            options: {
                useUTC: false, // for reading from database
            },
        },
        timezone:'+03:00',
        logging:false,
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging:false
    },
)

sequelize.sync({alter: true});

module.exports={
    sequelize
}