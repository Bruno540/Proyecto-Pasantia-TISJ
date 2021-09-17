const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.use(morgan('dev'));

const rutasUsuario = require("./src/routes/Usuario");

const rutasLogin = require('./src/routes/Login');

app.use('/api/login', rutasLogin);

app.use('/api/usuarios', rutasUsuario);

app.get('/test', (req,res)=>{
    res.json({message:"Bienvenido a la terminal de omnibus!"});
});

app.listen(4000,()=>{
    console.log("Server on port 4000");
});