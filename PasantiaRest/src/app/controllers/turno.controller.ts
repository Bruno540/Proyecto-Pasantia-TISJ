import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { validateTurno } from "../libraries/validation.library";
import { TurnoRepository } from "../repositories/turno.repository";
import validator from "validator";
import { Turno } from "../models/turno/turno.model";
import { TipoTurno } from "../models/turno/tipo-turno.model";

export const get = async (request: Request, response: Response): Promise<Response> => {
    const result = await getCustomRepository(TurnoRepository).findAll(request.query);
    return response.status(200).json(result);
}

export const getTipos = async (request: Request, response: Response): Promise<Response> => {
    const result = await getRepository(TipoTurno).find();
    return response.status(200).json(result);
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    const result = await getCustomRepository(TurnoRepository).findOne(request.params.id);
    return response.status(200).json(result);
}

export const post = async (request: Request, response: Response): Promise<Response> => {
    request.body = await validateTurno(request.body);
    return response.status(201).json(await getRepository(Turno).save(request.body));
}

export const put = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");

    const turno = await getCustomRepository(TurnoRepository).findOne(request.params.id);
    if (!turno) throw new ApiError("No existe el turno");

    request.body.id = turno.id;

    request.body = await validateTurno(request.body);

    return response.status(204).json(await getRepository(Turno).save(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de la empresa");

    const turno = await getCustomRepository(TurnoRepository).findOne(request.params.id);
    if (!turno) throw new ApiError("No existe el turno");

    await getCustomRepository(TurnoRepository).softDelete(turno.id);

    return response.status(204).json();
}