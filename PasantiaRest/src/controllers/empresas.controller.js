const Empresa = require("../models/Empresa");

const getAll = async (request, response) => {
    return response.status(200).json(Empresa.getAll());
}

module.exports = {
    getAll
}