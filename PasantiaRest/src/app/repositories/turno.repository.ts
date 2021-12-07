import { Between, EntityRepository, getRepository, Repository } from "typeorm";
import { EstadoRegistro, Turno } from "../models/turno/turno.model";
import { DiaSemana } from "../util/obtenerDia";
import { ApiError } from "../../config/api-error";
import moment from "moment";
import { Registro } from "../models/registro.model";


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
        var dia = moment().day();
        var diaSemana = DiaSemana.obtenerDia(dia);
        if(!diaSemana) throw new ApiError("No existe el dia de la semana"); 
        var arriba = moment().add(10,'minutes').format("HH:mm:ss");
        var abajo = moment().subtract(10,'minutes').format('HH:mm:ss');
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

    liveTurnos = async (): Promise<Turno[] | undefined> => {
        const dia = moment().day();
        const diaSemana = DiaSemana.obtenerDia(dia);
        if(!diaSemana) throw new ApiError("No existe el dia de la semana"); 
        const arriba = moment().add(2,'hours').format("HH:mm");
        const abajo = moment().subtract(12,'hours').format('HH:mm');
        // const turnos = await getRepository(Turno).find({
        //     where: 
        //         {
        //             hora: Between(abajo,arriba),
        //             activo: true,
        //             [diaSemana] : true
        //         },
        //     relations: ["empresa", "tipo"],
        //     order:{'hora':'DESC'}
        // });

        const turnos = await getRepository(Turno)
            .createQueryBuilder("turno").leftJoinAndSelect("turno.registros", "registro").leftJoinAndSelect("turno.tipo", "tipo").leftJoinAndSelect("turno.empresa", "empresa").groupBy("turno.id").addGroupBy("registro.id").addGroupBy("tipo.id").addGroupBy("empresa.id").getRawMany();

        for(const turno of turnos){
            const horaTurno = moment(turno.turno_hora, ['H:m']);
            const toqueArriba = moment(turno.turno_hora, ['H:m']).add(10,'hours').toDate();
            const toqueAbajo = moment(turno.turno_hora, ['H:m']).subtract(10,'hours').toDate();
            const registro = await getRepository(Registro).find({
                where: {
                    turno: turno.turno_id,
                    toqueAnden: Between(toqueAbajo, toqueArriba)
                }
            })
            if(turno.tipo_nombre === "Salida"){
                if(registro.length === 1){
                    turno.estado = EstadoRegistro.PARTIO
                }else{
                    if(registro.length === 0){
                        if(horaTurno < moment()){
                            turno.estado = EstadoRegistro.RETRASADO
                        }else{
                            turno.estado = EstadoRegistro.NOPARTIO
                        }
                    }
                }
            }

            if(turno.tipo_nombre === "Llegada"){
                if(registro.length === 1){
                    turno.estado = EstadoRegistro.ARRIBO
                }else{
                    if(registro.length === 0){
                        if(horaTurno < moment()){
                            turno.estado = EstadoRegistro.RETRASADO
                        }else{
                            turno.estado = EstadoRegistro.NOARRIBO
                        }
                    }
                }
            }

            if(turno.tipo_nombre === "Pasada"){
                if(registro.length === 1){
                    turno.estado = EstadoRegistro.ARRIBO;
                }else{
                    if(registro.length === 0){
                        if(horaTurno < moment()){
                            turno.estado = EstadoRegistro.RETRASADO;
                        }else{
                            turno.estado = EstadoRegistro.NOARRIBO;
                        }
                    }else{
                        turno.estado = EstadoRegistro.PARTIO;
                    }
                }
            }
        }

        return turnos;
    }
    
}