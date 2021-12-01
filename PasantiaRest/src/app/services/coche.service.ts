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

export const getById = async (id:any): Promise<Coche | undefined> => {
    let coche : Coche | undefined;
    coche = await getCustomRepository(CocheRepository).findOne(id,{
        relations: ["empresa"]
    });
    if(!coche) throw new ApiError("No existe el coche");
    return coche;
}

export const create = async (numero:string, matricula:string, empresaId:string): Promise<void>=>{
    const empresa = await getCustomRepository(EmpresaRepository).findOne(empresaId);
    if(!empresa) throw ApiError.badRequestError("No exite la empresa ingresada");
    if (await getCustomRepository(CocheRepository).findByMatricula(matricula)) throw ApiError.badRequestError("Ya existe un coche con la matricula ingresada");
    const coche = new Coche();
    coche.numero = numero;
    coche.matricula = matricula;
    coche.empresa = empresa;
    await getCustomRepository(CocheRepository).save(coche);
}

export const _delete = async(cocheId:any):Promise<void>=>{
    const coche = await getCustomRepository(CocheRepository).findOne(cocheId);
    if(!coche) throw new ApiError("No existe el coche");
    await getCustomRepository(CocheRepository).delete(cocheId);
}

export const update = async(cocheId:any, datos:any): Promise<void>=>{
    const coche = await getCustomRepository(CocheRepository).findOne(cocheId);
    if(!coche) throw new ApiError("No existe el coche");
    datos.id = coche.id
    await getCustomRepository(CocheRepository).save(datos);
}

export const buscar = async (filter:any, empresaId:any): Promise<Coche[] | undefined> => {
    return await getCustomRepository(CocheRepository).busqueda(filter,empresaId);
}