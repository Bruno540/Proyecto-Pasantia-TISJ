const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function login(req, res){
    Usuario.scope('password').findOne({
            where:{
                email: req.body.email
            }
        }).then(user=> {
        if(!user){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if(result){

                let SECRET_KEY=process.env.TK_SECRET_USUARIO;
                const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                SECRET_KEY,
                {
                    expiresIn: "1h"
                }
                )
                return res.status(200).json({
                    message: 'Auth successful',
                    token:token,
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        });
    });
}

module.exports={
    login
}