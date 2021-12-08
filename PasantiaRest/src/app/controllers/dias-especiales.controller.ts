import { Request, Response } from "express";
import moment from "moment";
import validator from "validator";
import { ApiError } from "../../config/api-error";
import * as DiasEspecialesService from "../services/dias-especiales.service";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await DiasEspecialesService.getAll());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de dia");

    const dia = await DiasEspecialesService.getById(Number(request.params.id));
    if (!dia) throw new ApiError("No se encontro el dia", 404);

    return response.json(dia);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if (request.body.nombre && typeof request.body.nombre != "string") throw new ApiError("Nombre invalido");
    if (typeof request.body.fecha != "string") throw new ApiError("Fecha invalida o no ingresada");
    if (!moment(request.body.fecha, 'YYYY-MM-DD', true).isValid()) throw ApiError.badRequestError("Formato de fecha invalido");

    return response.status(201).json(await DiasEspecialesService.create(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del dia");

    const dia = await DiasEspecialesService.getById(Number(request.params.id));
    if (!dia) throw new ApiError("No se encontro el dia", 404);

    return response.status(204).json(await DiasEspecialesService._delete(Number(request.params.id)));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del dia");

    if (request.body.nombre && typeof request.body.nombre != "string") throw new ApiError("Nombre invalido");
    if (request.body.fecha) {
        if (typeof request.body.fecha != "string") throw new ApiError("Fecha invalida o no ingresada");
        if (!moment(request.body.fecha, 'YYYY-MM-DD', true).isValid()) throw ApiError.badRequestError("Formato de fecha invalido");
    }

    const dia = await DiasEspecialesService.getById(Number(request.params.id));
    if (!dia) throw new ApiError("No se encontro el dia", 404);

    return response.status(204).json(await DiasEspecialesService.update(Number(request.params.id), request.body));
}