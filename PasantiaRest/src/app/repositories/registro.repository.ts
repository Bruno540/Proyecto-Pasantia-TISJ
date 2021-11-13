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

    async guardarRegistro(turnoId:string, cocheId:string){
        const turno = await getCustomRepository(TurnoRepository).findOne(turnoId);
        if(!turno) throw new ApiError("No exite el turno ingresado");
        const coche = await getCustomRepository(CocheRepository).findOne(cocheId);
        if(!coche) throw new ApiError("No exite el coche ingresado");
        const registro = new Registro();
        registro.toqueAnden = new Date();
        registro.turno = turno;
        registro.coche = coche;
        registro.save();
    }

}