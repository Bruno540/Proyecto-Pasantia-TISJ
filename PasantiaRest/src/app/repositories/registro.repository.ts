import { Between, EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Registro } from "../models/registro.model";
import { CocheRepository } from "./coche.repository";
import { TurnoRepository } from "./turno.repository";

@EntityRepository(Registro)
export class RegistroRepository extends Repository<Registro> {

    findByToqueAnden = async (toqueAnden: Date): Promise<Registro | undefined> => {
        return await getRepository(Registro).findOne({
            where: { toqueAnden }
        });
    }

    findUltimos = async (): Promise<Registro[] | undefined> => {
        // mas menos 10 minutos en milisegundos
        var arriba =new Date(new Date().getTime());
        var abajo = new Date(new Date().getTime() - 1200000);
        return await getRepository(Registro).find({
            where: {
                toqueAnden: Between(abajo,arriba)
            },
            relations: ["turno","turno.empresa","coche"],
            order:{'toqueAnden':'DESC'}
        });
    }
}