import moment from "moment";
import { DeepPartial, FindConditions, getRepository } from "typeorm";
import { TipoTurno } from "../models/turno/tipo-turno.model";
import { Turno } from "../models/turno/turno.model";
import * as DiasEspecialesService from "../services/dias-especiales.service";
import { DiaSemana } from "../util/obtenerDia";

export const getAll = async (): Promise<Turno[]> => {
    return await getRepository(Turno).find({
        relations: ["empresa", "tipo"]
    });
}

export const getAllByEmpresa = async (idEmpresa: number): Promise<Turno[]> => {
    return await getRepository(Turno).find({
        where: { empresa: idEmpresa },
        relations: ["empresa", "tipo"]
    });
}

export const getTipos = async (): Promise<TipoTurno[]> => {
    return await getRepository(TipoTurno).find();
}

export const getById = async (id: number): Promise<Turno | undefined> => {
    return await getRepository(Turno).findOne(id, {
        relations: ["empresa", "tipo"]
    });
}

export const create = async (body: DeepPartial<Turno>): Promise<Turno> => {
    return await getRepository(Turno).save(body);
}

export const update = async (id: number, body: DeepPartial<Turno>): Promise<Turno> => {
    body.id = id;

    return await getRepository(Turno).save(body);
}

export const _delete = async (id: number): Promise<void> => {
    await getRepository(Turno).softDelete(id);
}

export const getFiltered = async (fecha?: string, hora?: string): Promise<Turno[]> => {
    let query = getRepository(Turno).createQueryBuilder("turno").leftJoinAndSelect("turno.registros", "registro").leftJoinAndSelect("turno.tipo", "tipo").leftJoinAndSelect("turno.empresa", "empresa").groupBy("turno.id").addGroupBy("registro.id").addGroupBy("tipo.id").addGroupBy("empresa.id");

    query.where("turno.activo = :activo", { activo: true });


    if (fecha) {
        const dia = DiaSemana.obtenerDia(moment(fecha).day());
        console.log(dia);
        
        query.andWhere(`turno.${dia} = :dia`, { dia: true })

        if (await DiasEspecialesService.esDiaEspecial(fecha)) {
            query.andWhere("turno.diasEspeciales = :diasEspeciales", { diasEspeciales: true });
        } else {
            query.andWhere("turno.diaNormal = :diaNormal", { diaNormal: true });
        }
    }

    if (hora) {
        query.andWhere("turno.hora = :hora", { hora });
    }

    return await query.getRawMany();
}

