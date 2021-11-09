import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { validateTurno } from "../libraries/validation.library";
import { Llegada } from "../models/turno/llegada.model";
import { Salida } from "../models/turno/salida.model";
import { TurnoRepository } from "../repositories/turno.repository";

export const get = async (request: Request, response: Response): Promise<Response> => {
    const result = await getCustomRepository(TurnoRepository).findAll(request.query);
    return response.status(200).json(result);
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    const result = await getCustomRepository(TurnoRepository).findOne(request.params.id);
    return response.status(200).json(result);
}

export const post = async (request: Request, response: Response): Promise<Response> => {
    await validateTurno(request.body);

    if (request.body.type == "Salida") {
        if (typeof request.body.destino != "string") throw ApiError.badRequestError("Destino de turno invalida");

        return response.status(201).json(await getRepository(Salida).save(request.body));
    } else if (request.body.type == "Llegada") {
        if (typeof request.body.salida != "string") throw ApiError.badRequestError("Salida de turno invalida");

        return response.status(201).json(await getRepository(Llegada).save(request.body));
    } else {
        throw ApiError.badRequestError("Tipo de turno invalido");
    }
}