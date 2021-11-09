import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { EmpresaRepository } from "../repositories/empresa.repository";
import validator from "validator";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await getCustomRepository(EmpresaRepository).find());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id de la empresa");
    
    const empresa = await getCustomRepository(EmpresaRepository).findOne(request.params.id);
    if(!empresa) throw new ApiError("No existe la empresa");

    return response.json(empresa);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.rut) throw new ApiError("Falta el rut de la empresa");
    if(!request.body.razonSocial) throw new ApiError("Falta la razon social de la empresa");

    return response.status(201).json(await getCustomRepository(EmpresaRepository).save(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id de la empresa");

    const empresa = await getCustomRepository(EmpresaRepository).findOne(request.params.id);
    if(!empresa) throw new ApiError("No existe la empresa");

    return response.status(204).json(await getCustomRepository(EmpresaRepository).delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id de la empresa");

    const empresa = await getCustomRepository(EmpresaRepository).findOne(request.params.id);
    if(!empresa) throw new ApiError("No existe la empresa");

    request.body.id = empresa.id;

    return response.status(204).json(await getCustomRepository(EmpresaRepository).save(request.body));
}