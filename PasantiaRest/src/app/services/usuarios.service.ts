import { DeepPartial, getCustomRepository, getRepository } from "typeorm";
import { verifyPassword } from "../libraries/encryptation.library";
import { Rol } from "../models/rol.model";
import { Usuario } from "../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuarios.repository";

/* ---------------------------------------< EMPRESAS SERVICE >--------------------------------------- */

export const getByEmailContrasenia = async (email: string, password: string): Promise<Usuario | undefined> => {
    const userSelectValues: (keyof Usuario)[] = ["id", "email", "nombre", "apellido", "password", "rol"]
    const usuario = await getCustomRepository(UsuarioRepository).findOne({
        select: userSelectValues,
        where: { email },
        relations: ["rol", "empresa"]
    });
    if (usuario && await verifyPassword(password, usuario.password)) return usuario;
    return undefined;
};

export const getByEmail = async (email: string): Promise<Usuario | undefined> => {
    const usuario = await getCustomRepository(UsuarioRepository).findByEmail(email);
    return usuario;
}

export const getAll = async (): Promise<Usuario[]> => {
    return await getCustomRepository(UsuarioRepository).find({
        relations: ["rol", "empresa"]
    })
}

export const getById = async (id: number): Promise<Usuario | undefined> => {
    return await getCustomRepository(UsuarioRepository).findOne(id, {
        relations: ["rol", "empresa"]
    });
}

export const getByEmpresa = async (id: number): Promise<Usuario | undefined> => {
    return await getCustomRepository(UsuarioRepository).findOne({
        where: { empresa: id },
        relations: ["rol", "empresa"]
    });
}

export const getRolById = async (id: number): Promise<Rol | undefined> => {
    return await getRepository(Rol).findOne(id);
}

export const getRolByNombre = async (nombre: string): Promise<Rol | undefined> => {
    return await getRepository(Rol).findOne({
        where: { nombre }
    });
}

export const create = async (body: DeepPartial<Usuario>): Promise<Usuario> => {
    return await getRepository(Usuario).save(body);
}

export const update = async (id: number, body: DeepPartial<Usuario>): Promise<Usuario> => {
    body.id = id;

    return await getRepository(Usuario).save(body);
}

export const _delete = async (id: number): Promise<void> => {
    await getRepository(Usuario).softDelete(id);
}