import moment from "moment";
import { getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Empresa } from "../models/empresa.model";
import { TipoTurno } from "../models/turno/tipo-turno.model";

export const validateTurno = async (data: any) => {
    if (typeof data.hora != "string") throw ApiError.badRequestError("Hora de turno invalida");
    if (!moment(data.hora, 'HH:mm:ss', true).isValid()) throw ApiError.badRequestError("Hora de turno invalida");

    if (!data.lunes && !data.martes && !data.miercoles && !data.jueves && !data.viernes && !data.sabado && !data.domingo) throw ApiError.badRequestError("Se debe seleccionar al menos un dia");

    if (typeof data.activo != "boolean") throw ApiError.badRequestError("Activo invalido");
    if (data.feriados && typeof data.feriados != "boolean") throw ApiError.badRequestError("Feriados invalido");
    if (data.diaNormal && typeof data.diaNormal != "boolean") throw ApiError.badRequestError("Dia normal invalido");

    if (typeof data.descripcion != "string") throw ApiError.badRequestError("Descripcion invalida");

    if (typeof data.tipo != "number") throw ApiError.badRequestError("Tipo de turno no ingresado");
    const tipoTurno = await getRepository(TipoTurno).findOne(data.tipo);
    if (!tipoTurno) throw ApiError.badRequestError("Tipo de turno invalido");

    if (typeof data.empresa != "number") throw ApiError.badRequestError("Empresa no ingresado");
    const empresa = await getRepository(Empresa).findOne(data.empresa);
    if (!empresa) throw ApiError.badRequestError("Empresa de turno invalido");

    data.empresa = empresa;

    switch (tipoTurno.nombre) {
        case "Salida":
            if (typeof data.horaSalida != "string") throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (!moment(data.horaSalida, 'HH:mm:ss', true).isValid()) throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (typeof data.salidaDesde != "string") throw ApiError.badRequestError("lugar de salida de turno invalida");

            break;

        case "Llegada":
            if (typeof data.horaLlegada != "string") throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (!moment(data.horaLlegada, 'HH:mm:ss', true).isValid()) throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (typeof data.destino != "string") throw ApiError.badRequestError("destino de llegada de turno invalida");

            break;

        case "Pasada":
            if (typeof data.horaSalida != "string") throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (!moment(data.horaSalida, 'HH:mm:ss', true).isValid()) throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (typeof data.salidaDesde != "string") throw ApiError.badRequestError("lugar de salida de turno invalida");
            if (typeof data.horaLlegada != "string") throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (!moment(data.horaLlegada, 'HH:mm:ss', true).isValid()) throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (typeof data.destino != "string") throw ApiError.badRequestError("destino de llegada de turno invalida");
            
            break;

        default:
            break;
    }

    return data;
}