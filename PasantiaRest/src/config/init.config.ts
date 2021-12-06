import { getRepository } from "typeorm";
import { TipoTurno } from "../app/models/turno/tipo-turno.model";

export class Seeder {

    static async seed() {
        await Seeder.seedTiposTurnos()
    }

    static async seedTiposTurnos() {
        const repository = getRepository(TipoTurno);
        if (await repository.count() == 0) {
            const turnos = ["Salida", "Llegada", "Pasada"];

            for await (const turno of turnos) {
                const elem = repository.create({nombre: turno})
                await repository.save(elem);
            }
        }
    }

}