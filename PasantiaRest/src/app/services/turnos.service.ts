import { DeepPartial, getRepository } from "typeorm";
import { TipoTurno } from "../models/turno/tipo-turno.model";
import { Turno } from "../models/turno/turno.model";

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
