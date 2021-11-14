import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Registro } from "../models/registro.model";
import { CocheRepository } from "./coche.repository";
import { TurnoRepository } from "./turno.repository";

@EntityRepository(Registro)
export class RegistroRepository extends Repository<Registro> {

    findByToqueAnden = async (toqueAnden: Date): Promise<Registro | undefined> => {
        return await getRepository(Registro).findOne({
            where: { toqueAnden }
        })
    }
}