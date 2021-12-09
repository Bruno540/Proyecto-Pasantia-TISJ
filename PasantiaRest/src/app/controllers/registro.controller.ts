import { Request, Response } from "express";
import { EventEmitter } from "stream";
import { getCustomRepository } from "typeorm";
import validator from "validator";
import { ApiError } from "../../config/api-error";
import { validateFechas } from "../libraries/validation.library";
import { TurnoRepository } from "../repositories/turno.repository";
import * as registroService from "../services/registro.service";
const Stream = new EventEmitter();

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await registroService.getAll());
}

export const sseStablish = async (request: Request, response: Response) =>{
    response.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        Connection: 'keep-alive'
    });
    Stream.on('push',(event,data)=>{
        response.write('event: '+String(event) +'\n'+ 'data: ' + JSON.stringify(data) + '\n\n')
    })
    setInterval(async ()=>{
        Stream.emit('push','message',await getCustomRepository(TurnoRepository).liveTurnos());
    },60000)
}

export const getAllOrderByToqueAnden = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await registroService.getAllOrderByToqueAnden());
}

export const findUltimos = async (request: Request, response: Response) =>{
    return response.json(await registroService.findUltimos());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del registro");
    return response.json(await registroService.getById(request.params.id));
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.turnoId) throw new ApiError("Falta el id del turno");
    if(!request.body.cocheId) throw new ApiError("Falta el id del coche");
    return response.status(201).json(await registroService.create(request.body.turnoId, request.body.cocheId, request.body.observaciones, Stream));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del registro");
    return response.status(204).json(await registroService._delete(request.params.id, Stream));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del registro");
    return response.status(204).json(await registroService.update(request.params.id,request.body, Stream));
}

export const verReportes = async (request: Request, response: Response): Promise<Response> => {
    if(request.query.fechaDesde || request.query.fechaHasta) await validateFechas(request.query);
    if(!request.query.tipoid) throw new ApiError("Falta el id del tipo");
    return response.json(await registroService.verReportes(request.query.fechaDesde, request.query.fechaHasta, request.query.tipoid));
}

export const vertodosReportes = async (request: Request, response: Response): Promise<Response> => {
    if(request.query.fechaDesde || request.query.fechaHasta) await validateFechas(request.query);
    return response.json(await registroService.verTodosReportes(request.query.fechaDesde, request.query.fechaHasta));
}
