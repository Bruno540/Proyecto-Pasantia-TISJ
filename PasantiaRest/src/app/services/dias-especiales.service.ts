import { DeepPartial, getRepository } from "typeorm";
import { DiaEspecial } from "../models/dia-especial.model";

export const getAll = async (): Promise<DiaEspecial[]> => {
    return await getRepository(DiaEspecial).find();
}

export const getById = async (id: number): Promise<DiaEspecial | undefined> => {
    return await getRepository(DiaEspecial).findOne(id);
}

export const create = async (body: DeepPartial<DiaEspecial>): Promise<DiaEspecial> => {
    const dia = getRepository(DiaEspecial).create(body);
    
    return await getRepository(DiaEspecial).save(dia);
}

export const update = async (id: number, body: DeepPartial<DiaEspecial>): Promise<void> => {
    body.id = id;

    await getRepository(DiaEspecial).save(body);
}

export const _delete = async (id: number): Promise<void> => {
    await getRepository(DiaEspecial).softDelete(id);
}
