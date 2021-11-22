import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { createToken } from "../libraries/tokens.library";
import { Rol } from "../models/rol.model";
import * as usuariosService from "../services/usuarios.services";

export const login = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw ApiError.badRequestError("No se ingreso el email");
    if (!request.body.password) throw ApiError.badRequestError("No se ingreso la contraseña");

    const usuario = await usuariosService.getByEmailContrasenia(request.body.email, request.body.password);
    if (!usuario) throw ApiError.badRequestError("Credenciales Invalidas");

    const { token, exp } = createToken(usuario.email);
    return response.status(200).json({ usuario: { email: usuario.email, rol: usuario.rol?.nombre }, token, exp });
}

export const getRoles = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Rol).find());
}