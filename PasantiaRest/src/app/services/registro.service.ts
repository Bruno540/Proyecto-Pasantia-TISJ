import {getCustomRepository, getRepository} from "typeorm";
import {ApiError} from "../../config/api-error";
import {Registro} from "../models/registro.model";
import {RegistroRepository} from "../repositories/registro.repository";
import {CocheRepository} from "../repositories/coche.repository";
import {TurnoRepository} from "../repositories/turno.repository";
import moment from "moment";
import { EventEmitter } from "stream";
import { Turno } from "../models/turno/turno.model";

export const getAll = async (): Promise<Registro[] | undefined> => {
    return await getCustomRepository(RegistroRepository).find({
        relations: ["turno", "coche", "coche.empresa","turno.empresa"]
    });
}

export const getAllOrderByToqueAnden = async (): Promise<Registro[] | undefined> => {
    return await getCustomRepository(RegistroRepository).find({
        relations: ["turno", "coche", "coche.empresa","turno.empresa"],
        order:{'toqueAnden':'ASC'}
    });
}

export const getById = async (id:any): Promise<Registro | undefined> => {
    let registro : Registro | undefined;
    registro = await getCustomRepository(RegistroRepository).findOne(id);
    if(!registro) throw new ApiError("No existe el registro");
    return registro;
}

export const findUltimos = async (): Promise<Registro[] | undefined> =>{
    return await getCustomRepository(RegistroRepository).findUltimos();
}

export const create = async (turnoId:any, cocheId:any, observaciones:string, Stream: EventEmitter): Promise<void>=>{
    const turno = await getCustomRepository(TurnoRepository).findOne(turnoId,{
        relations:["tipo","empresa"]
    });
    if(!turno) throw new ApiError("No existe el turno ingresado");
    const coche = await getCustomRepository(CocheRepository).findOne(cocheId);
    if(!coche) throw new ApiError("No existe el coche ingresado");
    const registro = new Registro();
    // switch (turno.tipo.nombre){
    //     case "Salida":{
    //         registro.estado = EstadoRegistro.PARTIO;
    //         break;
    //     }
    //     case "Llegada":{
    //         registro.estado = EstadoRegistro.ARRIBO;
    //         break;
    //     }
    //     case "Pasada":{
    //         registro.estado = EstadoRegistro.ARRIBO;
    //         break;
    //     }
    // }
    registro.toqueAnden = new Date();
    registro.observaciones = observaciones;
    registro.turno = turno;
    registro.coche = coche;
    const registroGuardado = await getCustomRepository(RegistroRepository).save(registro);
    Stream.emit('push','message',await getCustomRepository(TurnoRepository).liveTurnos());
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