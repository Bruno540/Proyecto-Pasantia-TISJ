import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../models/usuario.model";


@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {

    findByEmail(email: string) {
        return this.findOne({
            where: { email },
            relations: ["rol", "empresa"]
        });
    }

}
