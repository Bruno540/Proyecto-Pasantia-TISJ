import moment from "moment";
import { Between, EntityRepository, getRepository, Repository } from "typeorm";
import { Registro } from "../models/registro.model";

@EntityRepository(Registro)
export class RegistroRepository extends Repository<Registro> {

    findByToqueAnden = async (toqueAnden: Date): Promise<Registro | undefined> => {
        return await getRepository(Registro).findOne({
            where: { toqueAnden }
        });
    }

    findUltimos = async (): Promise<Registro[] | undefined> => {
        // mas menos 10 minutos en milisegundos
        //var arriba = new Date(new Date().getTime());
        //var abajo = new Date(new Date().getTime() - 1200000);
        var arriba = moment().toDate()
        var abajo = moment().subtract(20,'minutes').toDate()
        return await getRepository(Registro).find({
            where: {
                toqueAnden: Between(abajo,arriba)
            },
            relations: ["turno","turno.empresa","coche"],
            order:{'toqueAnden':'DESC'}
        });
    }
}