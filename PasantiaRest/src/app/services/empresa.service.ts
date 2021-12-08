import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Coche } from "../models/coche.model";
import { Empresa } from "../models/empresa.model";
import { EmpresaRepository } from "../repositories/empresa.repository";

export const getAll = async (): Promise<Empresa[] | undefined> => {
    return await getCustomRepository(EmpresaRepository).find();
}

export const getCoches = async (id:any): Promise<Coche[] | undefined> => {
    const empresa = await getCustomRepository(EmpresaRepository).findOne(id,{
        relations: ["coches"],
    });
    return empresa?.coches;
}

export const getById = async (id:any): Promise<Empresa | undefined> => {
    let empresa : Empresa | undefined;
    empresa = await getCustomRepository(EmpresaRepository).findOne(id);
    if(!empresa) throw new ApiError("No existe la empresa");
    return empresa;
}

export const create = async (datos:any, file:any): Promise<void>=>{
    if (await getCustomRepository(EmpresaRepository).findByRazonSocial(datos.razonSocial)) throw ApiError.badRequestError("Ya existe una empresa con esa nombre");
    if (await getCustomRepository(EmpresaRepository).findByRut(datos.rut)) throw ApiError.badRequestError("Ya existe una empresa con ese numero de rut");
    
    if (file) {
        datos.imagen = file.filename;
    }
    await getCustomRepository(EmpresaRepository).save(datos);
}

export const _delete = async(empresaId:any):Promise<void>=>{
    const empresa = await getCustomRepository(EmpresaRepository).findOne(empresaId);
    if(!empresa) throw new ApiError("No existe la empresa");
    await getCustomRepository(EmpresaRepository).delete(empresaId);
}

export const update = async(empresaId:any, datos:any, file:any): Promise<void>=>{
    const empresa = await getCustomRepository(EmpresaRepository).findOne(empresaId);
    if(!empresa) throw new ApiError("No existe la empresa");
    datos.id = empresa.id
    if(file){
        datos.imagen = file.filename;
    }
    await getCustomRepository(EmpresaRepository).save(datos);
}