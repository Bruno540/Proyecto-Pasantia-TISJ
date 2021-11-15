import { getCustomRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Registro } from "../models/registro.model";
import { RegistroRepository } from "../repositories/registro.repository";
import { CocheRepository } from "../repositories/coche.repository";
import { TurnoRepository } from "../repositories/turno.repository";

export const getAll = async (): Promise<Registro[] | undefined> => {
    return await getCustomRepository(RegistroRepository).find({
        relations: ["turno", "coche", "coche.empresa"]
    });
}

export const getById = async (id:any): Promise<Registro | undefined> => {
    let registro : Registro | undefined;
    registro = await getCustomRepository(RegistroRepository).findOne(id);
    if(!registro) throw new ApiError("No existe el registro");
    return registro;
}

export const create = async (turnoId:any, cocheId:any, observaciones:string): Promise<void>=>{
    const turno = await getCustomRepository(TurnoRepository).findOne(turnoId);
    if(!turno) throw new ApiError("No exite el turno ingresado");
    const coche = await getCustomRepository(CocheRepository).findOne(cocheId);
    if(!coche) throw new ApiError("No exite el coche ingresado");
    const registro = new Registro();
    registro.toqueAnden = new Date();
    registro.observaciones = observaciones;
    registro.turno = turno;
    registro.coche = coche;
    await getCustomRepository(RegistroRepository).save(registro);
}

export const _delete = async(registroId:any):Promise<void>=>{
    const registro = await getCustomRepository(RegistroRepository).findOne(registroId);
    if(!registro) throw new ApiError("No existe el registro");

    await getCustomRepository(RegistroRepository).delete(registroId);
}

export const update = async(registroId:any, datos:any): Promise<void>=>{
     const registro = await getCustomRepository(RegistroRepository).findOne(registroId);
     if(!registro) throw new ApiError("No existe el registro");
     datos.id = registro.id
     await getCustomRepository(RegistroRepository).save(datos);
}