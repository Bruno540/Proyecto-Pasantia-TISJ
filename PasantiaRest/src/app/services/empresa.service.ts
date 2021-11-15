import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Empresa } from "../models/empresa.model";
import { EmpresaRepository } from "../repositories/empresa.repository";

export const getAll = async (): Promise<Empresa[] | undefined> => {
    return await getCustomRepository(EmpresaRepository).find();
}

export const getById = async (id:any): Promise<Empresa | undefined> => {
    let empresa : Empresa | undefined;
    empresa = await getCustomRepository(EmpresaRepository).findOne(id);
    if(!empresa) throw new ApiError("No existe la empresa coche");
    return empresa;
}

export const create = async (datos:any): Promise<void>=>{
    if (await getCustomRepository(EmpresaRepository).findByRazonSocial(datos.razonSocial)) throw ApiError.badRequestError("Ya existe una empresa con esa nombre");
    if (await getCustomRepository(EmpresaRepository).findByRut(datos.rut)) throw ApiError.badRequestError("Ya existe una empresa con ese numero de rut");
    await getCustomRepository(EmpresaRepository).save(datos);
}

export const _delete = async(empresaId:any):Promise<void>=>{
    const empresa = await getCustomRepository(EmpresaRepository).findOne(empresaId);
    if(!empresa) throw new ApiError("No existe la empresa");
    await getCustomRepository(EmpresaRepository).delete(empresaId);
}

export const update = async(empresaId:any, datos:any): Promise<void>=>{
    const empresa = await getCustomRepository(EmpresaRepository).findOne(empresaId);
    if(!empresa) throw new ApiError("No existe la empresa");
    datos.id = empresa.id
    await getCustomRepository(EmpresaRepository).save(datos);
}