import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { CocheRepository } from "../repositories/coche.repository";
import { EmpresaRepository } from "../repositories/empresa.repository";
import validator from "validator";
import * as cocheService from "../services/coche.service";
import { Coche } from "../models/coche.model";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await getCustomRepository(CocheRepository).find());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id de coche");
    
    const coche = await getCustomRepository(CocheRepository).findOne(request.params.id);
    if(!coche) throw new ApiError("No existe el coche");

    return response.json(coche);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.numero) throw new ApiError("Falta el numero de coche");
    if(!request.body.matricula) throw new ApiError("Falta la matricula del coche");
    if(!request.body.empresaId) throw new ApiError("Falta el id de la empresa");

    //console.log(request.body.empresaId);
    //tendria que chequear si en la empresa ya existe un coche con ese numero
    //Number.parseInt(request.params.id) mejor usar esto ahi en el findOne
    var idEmp: number = +request.body.empresaId
    const empresa = await getCustomRepository(EmpresaRepository).findOne(idEmp);
    if(!empresa) throw ApiError.badRequestError("No exite la empresa ingresada");
    if (await cocheService.getByMatricula(request.body.matricula)) throw ApiError.badRequestError("Ya existe un coche con la matricula ingresada");

    const coche = new Coche();
    coche.numero = request.body.numero;
    coche.matricula = request.body.matricula;
    coche.empresa = empresa;
    
    return response.status(201).json(await getCustomRepository(CocheRepository).save(coche));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del coche");

    const coche = await getCustomRepository(CocheRepository).findOne(request.params.id);
    if(!coche) throw new ApiError("No existe el coche");

    return response.status(204).json(await getCustomRepository(CocheRepository).delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id || !validator.isInt(request.params.id)) throw new ApiError("Falta el id del coche");

    const coche = await getCustomRepository(CocheRepository).findOne(request.params.id);
    if(!coche) throw new ApiError("No existe el coche");

    request.body.id = coche.id;

    return response.status(204).json(await getCustomRepository(CocheRepository).save(request.body));
}