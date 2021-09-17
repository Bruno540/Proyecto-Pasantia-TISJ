const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function obtenerUsuarios(req,res){
    try{
        const usuarios = await Usuario.findAll()
        res.json({
            usuarios: usuarios
        })
    }catch(error){
        res.json({
            msg: 'Algo salio mal'
        })
    }
}

async function obtenerUsuario(req,res){
    const { id } = req.params;
    try{
        const usuario = await Usuario.findOne({
            where:{
                id
            }
        });
        if(usuario){
            res.json({
                msg: 'Usuario encontrado',
                usuario: usuario
            })
        }else{
            res.json({
                msg: 'Usuario no encontrado',
            })
        }
    }catch(error){
        res.json({
            msg: 'Algo salio mal'
        })
    }
}

async function agregarUsuario(req,res){
    const { email, password } = req.body;
    try{
        const usuario = await Usuario.create({
            email: email,
            password: password
        })
        if(usuario){
            res.json({
                message: 'Se agrego el usuario correctamente',
                user: usuario
            });
        }
    }catch(error){
        res.json({
            msg: 'Algo salio mal'
        })
    } 
}

async function eliminarUsuario(req,res){
    const { id } = req.params;
    try{
        await Usuario.destroy({
            where:{
                id
            }
        });
        res.json({
            msg: 'Se elimino el admin correctamente'
        })
    }catch(error){
        res.json({
            msg: 'Algo salio mal'
        })
    }
}

async function actualizarUsuario(req,res){
    const { id } = req.params;
    const { email} = req.body;
    try{
        await Usuario.update({

            email
        },
        {
            where:{
                id
            }
        });
        res.json({
            msg: 'Se actualizo el usuario correctamente'
        })
    }catch(error){
        res.json({
            msg: 'Algo salio mal'
        })
    }
}

module.exports = {
    agregarUsuario,
    eliminarUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    actualizarUsuario
}
