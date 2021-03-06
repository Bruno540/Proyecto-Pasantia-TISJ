import { Request, Response } from "express";
import { ApiError } from "../../config/api-error";
import { UsuarioRepository } from "../repositories/usuarios.repository";
import validator from "validator";
import * as usuariosService from "../services/usuarios.service";
import * as empresasService from "../services/empresa.service";
import { encryptPassword } from "../libraries/encryptation.library";

export const getAll = async (request: Request, response: Response): Promise<Response> => {
    return response.json(await usuariosService.getAll());
}

export const getById = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id de usuario");

    const usuario = await usuariosService.getById(Number(request.params.id));
    if (!usuario) throw ApiError.badRequestError("No existe el usuario");

    return response.json(usuario);
}

export const create = async (request: Request, response: Response): Promise<Response> => {
    if (typeof request.body.email != "string") throw ApiError.badRequestError("Falta el email del usuario");
    if (typeof request.body.password != "string") throw ApiError.badRequestError("Falta la contraseña del usuario");
    if (typeof request.body.nombre != "string") throw ApiError.badRequestError("Falta el nombre del usuario");
    if (typeof request.body.apellido != "string") throw ApiError.badRequestError("Falta el apellido del usuario");
    if (!validator.isEmail(request.body.email)) throw ApiError.badRequestError("El email ingresado no es valido");

    if (await usuariosService.getByEmail(request.body.email)) throw ApiError.badRequestError("Ya existe un usuario con el email ingresado");

    const rol = await usuariosService.getRolByNombre("Empresa");
    if (!rol) throw ApiError.badRequestError("El rol ingresado no existe");

    request.body.rol = rol.id;

    if (typeof request.body.empresa != "number") throw ApiError.badRequestError("Falta la empresa del usuario");
    if (await usuariosService.getByEmpresa(request.body.empresa)) throw ApiError.badRequestError("Ya existe un usuario con la empresa seleccionada");
    const empresa = await empresasService.getById(request.body.empresa);
    if (!empresa) throw ApiError.badRequestError("Empresa no encontrada");
    request.body.empresa = empresa;

    request.body.password = await encryptPassword(request.body.password);

    return response.status(201).json(await usuariosService.create(request.body));
}

export const _delete = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id de usuario");

    const usuario = await usuariosService.getById(Number(request.params.id));
    if (!usuario) throw ApiError.badRequestError("No existe el usuario");

    if (request.params.id == request.user.id) throw ApiError.badRequestError("No puedes borrarte a ti mismo");

    return response.status(204).json(await usuariosService._delete(usuario.id));
}

export const update = async (request: Request, response: Response): Promise<Response> => {
    if (!request.params.id || !validator.isInt(request.params.id)) throw ApiError.badRequestError("Falta el id de usuario");

    const usuario = await usuariosService.getById(Number(request.params.id));
    if (!usuario) throw ApiError.badRequestError("No existe el usuario");

    if (typeof request.body.password == "string" && request.body.password != "") {
        request.body.password = await encryptPassword(request.body.password);
    } else {
        request.body.password = undefined;
    }

    if (request.body.empresa) {
        if (typeof request.body.empresa != "number") throw ApiError.badRequestError("Falta la empresa del usuario");
        if (request.body.empresa != usuario.empresa.id) {
            if (await usuariosService.getByEmpresa(request.body.empresa)) throw ApiError.badRequestError("Ya existe un usuario con la empresa seleccionada");

            const empresa = await empresasService.getById(request.body.empresa);
            if (!empresa) throw ApiError.badRequestError("Empresa no encontrada");
            request.body.empresa = empresa;
        }
    }

    return response.status(204).json(await usuariosService.update(usuario.id, request.body));
}