import moment from "moment";
import { Between, EntityRepository, getRepository, Repository } from "typeorm";
import { Registro } from "../models/registro.model";
import { TipoTurno } from "../models/turno/tipo-turno.model";

@EntityRepository(Registro)
export class RegistroRepository extends Repository<Registro> {

    findByToqueAnden = async (toqueAnden: Date): Promise<Registro | undefined> => {
        return await getRepository(Registro).findOne({
            where: { toqueAnden }
        });
    }

    findUltimos = async (): Promise<Registro[] | undefined> => {
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

    getDia = async (): Promise<Registro[] | undefined> => {
        var abajo = moment().startOf('day').toDate();
        var arriba = moment().endOf('day').toDate()
        return await getRepository(Registro).find({
            where: {
                toqueAnden: Between(abajo,arriba)
            },
            relations: ["turno", "coche", "coche.empresa", "turno.empresa"],
            order:{'toqueAnden':'DESC'}
        });
    }

    filtrarRegistros = async (fechaDesde: any, fechaHasta: any, tipoid:number): Promise<Registro[] | undefined> => {
        if(!fechaDesde && !fechaHasta){
            fechaDesde =  moment().startOf('day');
            fechaHasta =  moment().endOf('day');
        }else{
            fechaDesde = moment(fechaDesde).startOf('day');
            fechaHasta = moment(fechaHasta).endOf('day');
        }
        return await getRepository(Registro).find({
            where: {
                createdDate: Between(fechaDesde,fechaHasta),
                turno : {
                    tipo:{
                        id: tipoid
                    }
                }
            },
            relations: ["turno","turno.empresa","coche", "turno.tipo"],
            order:{'toqueAnden':'DESC'}
        });
    }

    AllRegistros = async (fechaDesde: any, fechaHasta: any): Promise<Registro[] | undefined> => {
        if(!fechaDesde && !fechaHasta){
            fechaDesde =  moment().startOf('day');
            fechaHasta =  moment().endOf('day');
        }else{
            fechaDesde = moment(fechaDesde).startOf('day');
            fechaHasta = moment(fechaHasta).endOf('day');
        }
        return await getRepository(Registro).find({
            where: {
                createdDate: Between(fechaDesde,fechaHasta),
            },
            relations: ["turno","turno.empresa","coche", "turno.tipo"],
            order:{'toqueAnden':'DESC'}
        });
    }
}