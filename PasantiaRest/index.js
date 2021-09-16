const express = require('express');

const app = express();

app.use(express.json());

app.get('/test', (req,res)=>{
    res.json({message:"Bienvenido a la terminal de omnibus!"});
});

app.listen(4000,()=>{
    console.log("Server on port 4000");
});