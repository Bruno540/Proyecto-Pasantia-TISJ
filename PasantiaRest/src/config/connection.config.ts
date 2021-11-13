import { createConnections } from "typeorm";
import { Seeder } from "./init.config";

export const connect = async () => {
    await createConnections().then(async () => {
        await Seeder.seed();

        console.log("Base de Datos Conectada");
    }).catch(error => {
        console.log(error);
    });
}