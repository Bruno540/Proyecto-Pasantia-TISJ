import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { UsuarioRepository } from "../repositories/usuario.repository";
import validator from "validator";
import * as usuariosService from "../services/usuario.service";
import { encryptPassword } from "../libraries/encryptation.library";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await getCustomRepository(UsuarioRepository).find());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id de usuario");
    
    const usuario = await getCustomRepository(UsuarioRepository).findOne(request.params.id);
    if(!usuario) throw new ApiError("No existe el usuario");

    return response.json(usuario);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if(!request.body.email) throw new ApiError("Falta el rut de la empresa");
    if(!request.body.password) throw new ApiError("Falta la razon social de la empresa");
    if (!validator.isEmail(request.body.email)) throw ApiError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw ApiError.badRequestError("Ya existe un usuario con el email ingresado");

    request.body.password = await encryptPassword(request.body.password);
    
    return response.status(201).json(await getCustomRepository(UsuarioRepository).save(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id del usuario");

    const usuario = await getCustomRepository(UsuarioRepository).findOne(request.params.id);
    if(!usuario) throw new ApiError("No existe la empresa");

    return response.status(204).json(await getCustomRepository(UsuarioRepository).delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if(!request.params.id ) throw new ApiError("Falta el id del usuario");

    const usuario = await getCustomRepository(UsuarioRepository).findOne(request.params.id);
    if(!usuario) throw new ApiError("No existe la empresa");

    request.body.id = usuario.id;

    return response.status(204).json(await getCustomRepository(UsuarioRepository).save(request.body));
}