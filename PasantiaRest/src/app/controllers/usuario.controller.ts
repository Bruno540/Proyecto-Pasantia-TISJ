import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { UsuarioRepository } from "../repositories/usuarios.repository";
import validator from "validator";
import * as usuariosService from "../services/usuarios.service";
import * as empresasService from "../services/empresa.service";
import { encryptPassword } from "../libraries/encryptation.library";
import { Rol } from "../models/rol.model";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await getCustomRepository(UsuarioRepository).find());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.id != "number" || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id de usuario");

    const usuario = await getCustomRepository(UsuarioRepository).findOne(request.params.id);
    if (!usuario) throw ApiError.badRequestError("No existe el usuario");

    return response.json(usuario);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.email != "string") throw ApiError.badRequestError("Falta el email del usuario");
    if (typeof request.body.password != "string") throw ApiError.badRequestError("Falta la contraseña del usuario");
    if (typeof request.body.nombre != "string") throw ApiError.badRequestError("Falta el nombre del usuario");
    if (typeof request.body.apellido != "string") throw ApiError.badRequestError("Falta el apellido del usuario");
    if (!validator.isEmail(request.body.email)) throw ApiError.badRequestError("El email ingresado no es valido");

    console.log(request.body);

    if (await usuariosService.getByEmail(request.body.email)) throw ApiError.badRequestError("Ya existe un usuario con el email ingresado");

    const rol = await (getRepository(Rol).findOne({ where: { nombre: "Empresa" } }));
    if (!rol) throw ApiError.badRequestError("El rol ingresado no existe");

    if (typeof request.body.empresa != "number") throw ApiError.badRequestError("Falta la empresa del usuario");
    const empresa = await empresasService.getById(request.body.empresa);
    request.body.empresa = empresa;

    request.body.password = await encryptPassword(request.body.password);

    return response.status(201).json(await getCustomRepository(UsuarioRepository).save(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.id != "number" || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id del usuario");

    const usuario = await getCustomRepository(UsuarioRepository).findOne(request.params.id);
    if (!usuario) throw ApiError.badRequestError("No existe el usuario");

    return response.status(204).json(await getCustomRepository(UsuarioRepository).delete(request.params.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.id != "number" || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id del usuario");

    const usuario = await getCustomRepository(UsuarioRepository).findOne(request.params.id);
    if (!usuario) throw ApiError.badRequestError("No existe la empresa");

    request.body.id = usuario.id;

    return response.status(204).json(await getCustomRepository(UsuarioRepository).save(request.body));
}