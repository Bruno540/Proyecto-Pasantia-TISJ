import { EntityRepository, Repository } from "typeorm";
import { Turno } from "../models/turno/turno.model";

@EntityRepository(Turno)
export class TurnoRepository extends Repository<Turno> {

    async findAll(query: any) {
        return await this.findAndCount({
            skip: query.skip ?? "",
            take: query.take ?? "",
            relations: ["empresa", "tipo"]
        })
    }
    
}