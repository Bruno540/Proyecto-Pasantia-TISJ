import { Request, Response } from "express";
import { ApiError } from "../../config/api-error";
import * as cocheService from "../services/coche.service";


export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json( await cocheService.getAll());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id de coche");
    return response.json(await cocheService.getById(request.params.id));
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.numero) throw new ApiError("Falta el numero de coche");
    if(!request.body.matricula) throw new ApiError("Falta la matricula del coche");
    if(!request.body.empresaId) throw new ApiError("Falta el id de la empresa");
    return response.status(201).json(await cocheService.create(request.body.numero, request.body.matricula, request.body.empresaId));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id del coche");
    return response.status(204).json(await cocheService._delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id del coche");
    return response.status(204).json(await cocheService.update(request.params.id, request.body));
}