const Router = require("express");
const empresasController = require("../controllers/empresas.controller");

const router = Router();

router.get('/', empresasController.getAll);

module.exports = router;