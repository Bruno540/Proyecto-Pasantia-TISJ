import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import validator from "validator";
import { Dia } from "../models/turno/dia.model";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await getRepository(Dia).find());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");
    
    const empresa = await getRepository(Dia).findOne(request.params.id);
    if(!empresa) throw new ApiError("No existe la empresa");

    return response.json(empresa);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.nombre) throw new ApiError("Nombre no ingresado");


    return response.status(201).json(await getRepository(Dia).save(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");

    const empresa = await getRepository(Dia).findOne(request.params.id);
    if(!empresa) throw new ApiError("No existe la empresa");

    return response.status(204).json(await getRepository(Dia).delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");

    const empresa = await getRepository(Dia).findOne(request.params.id);
    if(!empresa) throw new ApiError("No existe la empresa");

    request.body.id = empresa.id;

    return response.status(204).json(await getRepository(Dia).save(request.body));
}