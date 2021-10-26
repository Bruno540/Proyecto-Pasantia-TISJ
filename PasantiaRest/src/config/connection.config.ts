import { createConnections } from "typeorm";

export const connect = async () => {
    await createConnections().then(() => {
        console.log("Base de Datos Conectada");
    }).catch(error => {
        console.log(error);
    });
}