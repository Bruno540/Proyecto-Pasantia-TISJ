import { EntityRepository, getRepository, Like, Repository } from "typeorm";
import { empresaStorage } from "../libraries/file.library";
import { Coche } from "../models/coche.model";

@EntityRepository(Coche)
export class CocheRepository extends Repository<Coche> {

    findByMatricula = async (matricula: string): Promise<Coche | undefined> => {
        return await getRepository(Coche).findOne({
            where: { matricula }
        });
    };

    busqueda = async (filter:string, empresaId:any): Promise<Coche[] | undefined> => {
        // return await getRepository(Coche).createQueryBuilder("coche")
        // .where("coche.matricula like : matricula", {matricula: `%${filter}%`}).getMany();

        return await getRepository(Coche).find({
            where: [
                {
                    matricula: Like(`%${filter}%`),
                    empresa: empresaId
                },
                {
                    numero: Like(`%${filter}%`),
                    empresa:empresaId
                }
            ]
        });
    }
}