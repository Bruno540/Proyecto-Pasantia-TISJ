const Sequelize = require("sequelize");
const { sequelize } = require("../database/database");

/* ----------< MODELO EMPRESA >---------- */

const Empresa = sequelize.define('Empresa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rut: {
        type: Sequelize.STRING,
        unique: true
    },
    razonSocial: {
        type: Sequelize.STRING,
    }
}, {
    tableName: "empresas",
    timestamps: true,
    paranoid: true,
});

module.exports = Empresa;