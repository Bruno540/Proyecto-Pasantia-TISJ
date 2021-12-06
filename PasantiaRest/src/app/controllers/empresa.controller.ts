import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import validator from "validator";
import { ApiError } from "../../config/api-error";
import { EmpresaRepository } from "../repositories/empresa.repository";
import * as empresaService from "../services/empresa.service";


export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await empresaService.getAll());
}

export const getCoches = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");
    return response.json(await empresaService.getCoches(request.params.id));
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id de la empresa");
    return response.json(await empresaService.getById(request.params.id));
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.rut) throw ApiError.badRequestError("Falta el rut de la empresa");
    if(!request.body.razonSocial) throw ApiError.badRequestError("Falta la razon social de la empresa");
    
    console.log(request.file?.mimetype);
    
    // if(request.file && request.file.mimetype && request.file.mimetype.indexOf("image") !== -1) throw ApiError.badRequestError("Imagen invalida");

    return response.status(201).json(await empresaService.create(request.body,request.file));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id de la empresa");
    return response.status(204).json(await empresaService._delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id de la empresa");

    if(request.file && request.file.mimetype && request.file.mimetype.indexOf("image") === -1) throw ApiError.badRequestError("Imagen invalida");

    return response.status(204).json(await empresaService.update(request.params.id,request.body,request.file));
}