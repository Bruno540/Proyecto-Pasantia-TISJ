import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Coche } from "../models/coche.model";
import { CocheRepository } from "../repositories/coche.repository";
import { EmpresaRepository } from "../repositories/empresa.repository";

export const getAll = async (): Promise<Coche[] | undefined> => {
    return await getCustomRepository(CocheRepository).find({
        relations: ["empresa"]
    });
}

export const getAllByEmpresa = async (idEmpresa: number): Promise<Coche[] | undefined> => {
    return await getCustomRepository(CocheRepository).find({
        relations: ["empresa"],
        where: { empresa: idEmpresa }
    });
}

export const getById = async (id: any): Promise<Coche | undefined> => {
    let coche: Coche | undefined;
    coche = await getCustomRepository(CocheRepository).findOne(id, {
        relations: ["empresa"]
    });
    if (!coche) throw new ApiError("No existe el coche");
    return coche;
}

export const getByNumero = async (numero: any, empresa: number): Promise<Coche | undefined> => {
    return await getCustomRepository(CocheRepository).findOne({
        where: { numero, empresa },
        relations: ["empresa"]
    });
}

export const getByMatricula = async (matricula: any): Promise<Coche | undefined> => {
    return await getCustomRepository(CocheRepository).findOne({
        where: { matricula },
        relations: ["empresa"]
    });
}

export const create = async (data: any): Promise<void> => {
    await getCustomRepository(CocheRepository).save(data);
}

export const _delete = async (cocheId: any): Promise<void> => {
    const coche = await getCustomRepository(CocheRepository).findOne(cocheId);
    if (!coche) throw new ApiError("No existe el coche");
    await getCustomRepository(CocheRepository).delete(cocheId);
}

export const update = async (cocheId: any, datos: any): Promise<void> => {
    const coche = await getCustomRepository(CocheRepository).findOne(cocheId);
    if (!coche) throw new ApiError("No existe el coche");
    datos.id = coche.id
    await getCustomRepository(CocheRepository).save(datos);
}

export const buscar = async (filter:any, empresaId:any): Promise<Coche[] | undefined> => {
    return await getCustomRepository(CocheRepository).busqueda(filter,empresaId);
}