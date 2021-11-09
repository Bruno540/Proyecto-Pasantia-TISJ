import { getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Dia } from "../models/turno/dia.model";

export const validateTurno = async (data: any) => {
    if (typeof data.hora != "string") throw ApiError.badRequestError("Hora de turno invalida");
    if (typeof data.activo != "boolean") throw ApiError.badRequestError("Activo invalido");
    if (!data.dias && !Array.isArray(data.dias)) throw ApiError.badRequestError("Dias de turno invalido");
    if (!data.type) throw ApiError.badRequestError("Tipo de turno no ingresado");
    
    data.dias.forEach(async (dia: any) => {
        if(typeof dia.id != "string") throw ApiError.badRequestError("Id de Dia de turno invalido");
        if(!await getRepository(Dia).findOne(dia.id)) throw ApiError.badRequestError("Dia de turno no existe");
    });
}