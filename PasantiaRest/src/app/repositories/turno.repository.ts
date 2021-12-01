import moment, { now } from "moment";
import { Between, EntityRepository, getRepository, Repository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Turno } from "../models/turno/turno.model";
import { DiaSemana } from "../util/obtenerDia";

@EntityRepository(Turno)
export class TurnoRepository extends Repository<Turno> {

    async findAll(query: any) {
        var dia = moment().day();
        var diaSemana = DiaSemana.obtenerDia(dia);
        if(!diaSemana) throw new ApiError("No existe el dia de la semana"); 
        return await this.findAndCount({
            skip: query.skip ?? "",
            take: query.take ?? "",
            where: 
                {
                    activo: true,
                    [diaSemana] : true
                },
            relations: ["empresa", "tipo"],
            order:{'hora':'ASC'}
        })
    }

    findProximos = async (): Promise<Turno[] | undefined> => {
        // mas menos 10 minutos en milisegundos
        //var dia = new Date().getDay();
        var dia = moment().day();
        var diaSemana = DiaSemana.obtenerDia(dia);
        if(!diaSemana) throw new ApiError("No existe el dia de la semana"); 
        var arriba = moment().add(10,'minutes').format("HH:mm:ss");
        var abajo = moment().subtract(10,'minutes').format('HH:mm:ss');
        // var arriba = new Date(new Date().getTime() + 600000).toLocaleTimeString();
        // var abajo = new Date(new Date().getTime() - 600000).toLocaleTimeString();
        return await getRepository(Turno).find({
            where: 
                {
                    hora: Between(abajo,arriba),
                    activo: true,
                    [diaSemana] : true
                },
            relations: ["empresa", "tipo"],
            order:{'hora':'ASC'}
        });
    }
    
}