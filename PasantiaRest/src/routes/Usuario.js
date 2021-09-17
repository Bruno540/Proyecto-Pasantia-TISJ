const Router = require('express');

const { agregarUsuario, eliminarUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario } = require('../controllers/usuario.controller');

const router = Router();

router.get('/:id', obtenerUsuario );

router.put('/:id', actualizarUsuario );

router.get('/', obtenerUsuarios)

router.delete('/:id', eliminarUsuario);

router.post('/', agregarUsuario);

module.exports=router