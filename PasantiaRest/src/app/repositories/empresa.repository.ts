import { EntityRepository, getRepository, Repository } from "typeorm";
import { Empresa } from "../models/empresa.model";

@EntityRepository(Empresa)
export class EmpresaRepository extends Repository<Empresa> {

    findByRut = async (rut: string): Promise<Empresa | undefined> => {
        return await getRepository(Empresa).findOne({
            where: { rut }
        });
    };

    findByRazonSocial = async (razonSocial: string): Promise<Empresa | undefined> => {
        return await getRepository(Empresa).findOne({
            where: { razonSocial }
        });
    };
}