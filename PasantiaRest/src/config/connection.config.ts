import { ConnectionOptions, createConnections, getConnection } from "typeorm";
import { Seeder } from "./init.config";

export class Connection {

    static async connect(options?: ConnectionOptions[]) {
        await createConnections(options).then(async () => {
            await Seeder.seed();

            console.log("Base de Datos Conectada");
        }).catch(error => {
            console.log(error);
        });
    }

    static async disconnect() {
        const connection = getConnection();
        if (connection.isConnected) connection.close();
    }
}