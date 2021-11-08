import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
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
    const result = await getCustomRepository(TurnoRepository).save(request.body);
    return response.status(201).json(result);
}