import app from "./app/application";
import { Connection } from "./config/connection.config";

/* ---------------------------------------< APP DEPLOY >--------------------------------------- */

// Connexion a la base de datos.
Connection.connect().then(() => {
    const port = app.get("port");

    // Inicia la aplicacion en el puerto espcificado en app.config
    app.listen(port, () => {
        console.log("Aplicacion escuchando en el puerto:", port);
    });
});