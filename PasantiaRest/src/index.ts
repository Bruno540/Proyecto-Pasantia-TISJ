import { EventEmitter } from "stream";
import app from "./app/application";
import { Connection } from "./config/connection.config";
const cors = require('cors');
/* ---------------------------------------< APP DEPLOY >--------------------------------------- */

// Connexion a la base de datos.
Connection.connect().then(() => {
    //const port = app.get("port");

    // Inicia la aplicacion en el puerto espcificado en app.config
    app.use(cors({origin: '*'}));
    const server = app.listen(3000, () => {
        console.log("Aplicacion escuchando en el puerto:", 3000);
    });

    /*app.get('/sse',(req,res)=>{
        res.writeHead(200,{
            'Content-Type':'text/event-stream',
            'Cache-Control':'no-cache',
            Connection: 'keep-alive'
        });
        Stream.on('push',(event,data)=>{
            res.write('event: '+String(event) +'\n'+ 'data: ' + JSON.stringify(data) + '\n\n')
        })
    });*/

    /*setInterval(async ()=>{
        const registros = await getAllOrderByToqueAnden();
        //Stream.emit('push','message',registros);
    },2000)*/

});