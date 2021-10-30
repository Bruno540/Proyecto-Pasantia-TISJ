import { EntityRepository, getRepository, Repository } from "typeorm";
import { Usuario } from "../models/usuario.model";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {

    getByEmail = async (email: string): Promise<Usuario | undefined> => {
        return await getRepository(Usuario).findOne({
            where: { email }
        });
    };

}