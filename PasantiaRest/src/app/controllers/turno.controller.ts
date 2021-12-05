import { Request, Response } from "express";
import { ApiError } from "../../config/api-error";
import { validateTurno } from "../libraries/validation.library";
import { TurnoRepository } from "../repositories/turno.repository";
import validator from "validator";
import * as TurnosService from "../services/turnos.service";
import { getCustomRepository } from "typeorm";

export const get = async (request: Request, response: Response): Promise<Response> => {
    let result;

    if (request.user.rol.nombre == "Administrador") {
        result = await TurnosService.getAll();    
    } else {
        if(!request.user.empresa.id) throw ApiError.badRequestError("No se ingreso el usuario");

        result = await TurnosService.getAllByEmpresa(request.user.empresa.id);
    }

    return response.status(200).json(result);
}

export const getTipos = async (request: Request, response: Response): Promise<Response> => {
    const result = await TurnosService.getTipos();
    return response.status(200).json(result);
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Id invalido o no ingresado");

    const result = await TurnosService.getById(Number(request.params.id));
    if(!result) throw ApiError.badRequestError("No existe el turno");

    if(result.empresa.id != request.user.empresa.id) throw ApiError.badRequestError("El turno no le pretenece");

    return response.status(200).json(result);
}

export const post = async (request: Request, response: Response): Promise<Response> => {
    request.body = await validateTurno(request.body, request.user);

    return response.status(201).json(await TurnosService.create(request.body));
}

export const put = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Id invalido o no ingresado");

    const turno = await TurnosService.getById(Number(request.params.id));
    if (!turno) throw ApiError.badRequestError("No existe el turno");

    if(turno.empresa.id != request.user.empresa.id) throw ApiError.badRequestError("El turno no le pretenece");

    request.body = await validateTurno(request.body, request.user);

    return response.status(204).json(await TurnosService.update(turno.id, request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Id invalido o no ingresado");

    const turno = await TurnosService.getById(Number(request.params.id));
    if (!turno) throw ApiError.badRequestError("No existe el turno");

    if(turno.empresa.id != request.user.empresa.id) throw ApiError.badRequestError("El turno no le pretenece");

    await TurnosService._delete(turno.id);

    return response.status(204).json();
}

export const getProximos = async (request: Request, response: Response): Promise<Response> => {
    const result = await getCustomRepository(TurnoRepository).findProximos();
    return response.status(200).json(result);
}