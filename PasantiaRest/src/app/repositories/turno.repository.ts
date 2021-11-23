import { now } from "moment";
import { Between, EntityRepository, getRepository, Repository } from "typeorm";
import { Turno } from "../models/turno/turno.model";

@EntityRepository(Turno)
export class TurnoRepository extends Repository<Turno> {

    async findAll(query: any) {
        return await this.findAndCount({
            skip: query.skip ?? "",
            take: query.take ?? "",
            relations: ["empresa", "tipo"]
        })
    }

    findProximos = async (): Promise<Turno[] | undefined> => {
        // mas menos 10 minutos en milisegundos
        var arriba =new Date(new Date().getTime() + 600000).toLocaleTimeString();
        var abajo = new Date(new Date().getTime() - 600000).toLocaleTimeString();
        return await getRepository(Turno).find({
            where: 
                {
                    hora: Between(abajo,arriba)
                },
            relations: ["empresa", "tipo"]
        });
    }
    
}