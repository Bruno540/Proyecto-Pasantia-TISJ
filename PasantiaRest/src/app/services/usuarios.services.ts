import { DeepPartial, getCustomRepository } from "typeorm";
import { verifyPassword } from "../libraries/encryptation.library";
import { Usuario } from "../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuarios.repository";

/* ---------------------------------------< EMPRESAS SERVICE >--------------------------------------- */

export const getByEmailContrasenia = async (email: string, password: string): Promise<Usuario | undefined> => {
    const userSelectValues: (keyof Usuario)[] = ["email","nombre", "apellido", "password"]
    const usuario = await getCustomRepository(UsuarioRepository).findOne({
        select: userSelectValues,
        where: { email }
    });
    if (usuario && await verifyPassword(password, usuario.password)) return usuario;
    return undefined;
};

