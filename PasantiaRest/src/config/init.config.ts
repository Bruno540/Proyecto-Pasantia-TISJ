import { getRepository } from "typeorm";
import { encryptPassword } from "../app/libraries/encryptation.library";
import { Rol } from "../app/models/rol.model";
import { TipoTurno } from "../app/models/turno/tipo-turno.model";
import { Usuario } from "../app/models/usuario.model";

export class Seeder {

    static async seed() {
        await Seeder.seedTiposTurnos()
        await Seeder.seedRoles()
        await Seeder.seedAdmin()
    }

    static async seedTiposTurnos() {
        const repository = getRepository(TipoTurno);
        if (await repository.count() == 0) {
            const turnos = ["Salida", "Llegada", "Pasada"];

            for await (const turno of turnos) {
                const elem = repository.create({ nombre: turno })
                await repository.save(elem);
            }
        }
    }

    static async seedRoles() {
        const repository = getRepository(Rol);
        if (await repository.count() == 0) {
            const roles = ["Administrador", "Empresa", "Usuario"];

            for await (const rol of roles) {
                const elem = repository.create({ nombre: rol })
                await repository.save(elem);
            }
        }
    }

    static async seedAdmin() {
        const repository = getRepository(Usuario);        
        if (!await repository.findOne({ where: { email: "admin@admin.com" } })) {
            const admin = repository.create({
                email: "admin@admin.com",
                password: await encryptPassword("admin"),
                nombre: "Admin",
                apellido: "Admin",
                rol: await getRepository(Rol).findOne({ where: { nombre: "Administrador" } })
            });

            repository.save(admin);
        }
    }

}