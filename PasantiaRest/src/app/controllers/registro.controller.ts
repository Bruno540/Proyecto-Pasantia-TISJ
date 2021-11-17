import { Request, Response } from "express";
import validator from "validator";
import { ApiError } from "../../config/api-error";
import * as registroService from "../services/registro.service";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await registroService.getAll());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del registro");
    return response.json(await registroService.getById(request.params.id));
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.turnoId) throw new ApiError("Falta el id del turno");
    if(!request.body.cocheId) throw new ApiError("Falta el id del coche");
    return response.status(201).json(await registroService.create(request.body.turnoId, request.body.cocheId, request.body.observaciones));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del registro");
    return response.status(204).json(await registroService._delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del registro");
    return response.status(204).json(await registroService.update(request.params.id,request.body));
}