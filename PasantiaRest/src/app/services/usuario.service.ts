import { getCustomRepository } from "typeorm";
import { Usuario } from "../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuario.repository";

export const getByEmail = async (email: string): Promise<Usuario | undefined> => {
    let usuario: Usuario | undefined;

    usuario = await getCustomRepository(UsuarioRepository).getByEmail(email);
    if (usuario) return usuario;

    return usuario;
};