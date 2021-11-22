import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import validator from "validator";
import { ApiError } from "../../config/api-error";
import { EmpresaRepository } from "../repositories/empresa.repository";
import * as empresaService from "../services/empresa.service";


export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await empresaService.getAll());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");
    return response.json(await empresaService.getById(request.params.id));
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.rut) throw new ApiError("Falta el rut de la empresa");
    if(!request.body.razonSocial) throw new ApiError("Falta la razon social de la empresa");
    return response.status(201).json(await empresaService.create(request.body,request.file));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");
    return response.status(204).json(await empresaService._delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");
    return response.status(204).json(await empresaService.update(request.params.id,request.body,request.file));
}