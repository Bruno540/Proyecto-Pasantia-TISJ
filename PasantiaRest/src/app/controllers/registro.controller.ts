import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { RegistroRepository } from "../repositories/registro.repository";
import validator from "validator";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await getCustomRepository(RegistroRepository).find({
        relations: ["turno", "coche", "coche.empresa"]
    }));
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id del registro");
    
    const registro = await getCustomRepository(RegistroRepository).findOne(request.params.id);
    if(!registro) throw new ApiError("No existe el registro");

    return response.json(registro);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    //if(!request.body.toqueAnden) throw new ApiError("Falta la razon social de la empresa");
    if(!request.body.turnoId) throw new ApiError("Falta el id del turno");
    if(!request.body.cocheId) throw new ApiError("Falta el id del coche");

    return response.status(201).json(await getCustomRepository(RegistroRepository).guardarRegistro(request.body.turnoId, request.body.cocheId));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id del registro");

    const registro = await getCustomRepository(RegistroRepository).findOne(request.params.id);
    if(!registro) throw new ApiError("No existe el registro");

    return response.status(204).json(await getCustomRepository(RegistroRepository).delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id del registro");

    const registro = await getCustomRepository(RegistroRepository).findOne(request.params.id);
    if(!registro) throw new ApiError("No existe el registro");

    request.body.id = registro.id;

    return response.status(204).json(await getCustomRepository(RegistroRepository).save(request.body));
}