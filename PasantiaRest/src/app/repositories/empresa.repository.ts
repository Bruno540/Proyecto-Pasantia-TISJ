import { EntityRepository, Repository } from "typeorm";
import { Empresa } from "../models/empresa.model";

@EntityRepository(Empresa)
export class EmpresaRepository extends Repository<Empresa> {

    findByRut(rut: string) {
        return this.find({
            where: { rut }
        })
    }

}