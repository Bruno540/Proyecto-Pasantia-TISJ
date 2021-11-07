import { createConnections } from "typeorm";
import { initData } from "./init.config";

export const connect = async () => {
    await createConnections().then(async () => {
        await initData();
        console.log("Base de Datos Conectada");
    }).catch(error => {
        console.log(error);
    });
}