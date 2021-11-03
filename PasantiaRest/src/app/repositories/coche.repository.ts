import { EntityRepository, getRepository, Repository } from "typeorm";
import { Coche } from "../models/coche.model";

@EntityRepository(Coche)
export class CocheRepository extends Repository<Coche> {

    findByMatricula = async (matricula: string): Promise<Coche | undefined> => {
        return await getRepository(Coche).findOne({
            where: { matricula }
        });
    };

}