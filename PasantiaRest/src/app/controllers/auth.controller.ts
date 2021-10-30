import { Request, Response } from "express";
import { ApiError } from "../../config/api-error";
import { createToken } from "../libraries/tokens.library";
import * as usuariosService from "../services/usuarios.services";

export const login = async (request: Request, response: Response): Promise<Response> => {
    if (!request.body.email) throw new ApiError("No se ingreso el email");
    if (!request.body.password) throw new ApiError("No se ingreso la contraseña");
    const usuario = await usuariosService.getByEmailContrasenia(request.body.email, request.body.password);
    if (!usuario) throw new ApiError("Credenciales Invalidas");
    const { token, exp } = createToken(usuario.email);
    return response.status(200).json({ usuario: { email: usuario.email }, token, exp });
}


// export const iniciarSesion = async (request: Request, response: Response): Promise<Response> => {
//     if (!request.body.email) throw AppError.badRequestError("No se ingreso el email");
//     if (!request.body.contrasenia) throw AppError.badRequestError("No se ingreso la contraseña");

//     const usuario = await usuariosService.getByEmailContrasenia(request.body.email, request.body.contrasenia);

//     if (!usuario) throw AppError.badRequestError("Credenciales Invalidas");

//     if (usuario.estado != EstadoUsuario.ACTIVO) throw AppError.badRequestError("El usuario no se encuentra activo");

//     if (usuario.constructor.name == "Empresa") {
//         const empresa: Empresa = usuario as Empresa;
//         if (moment().isAfter(moment(empresa.vencimiento))) {
//             empresa.estado = EstadoUsuario.INACTIVO;
//             await usuariosService.actualizar(empresa);
//             throw AppError.badRequestError("La fecha de utlizacion ya expiro");
//         }
//     }

//     const { token, exp } = createToken(usuario.email);

//     return response.status(200).json({ usuario: { email: usuario.email, tipo: usuario.constructor.name }, token, exp });
// }