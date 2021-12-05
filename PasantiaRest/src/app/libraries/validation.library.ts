import moment from "moment";
import { getRepository } from "typeorm";
import { ApiError } from "../../config/api-error";
import { Empresa } from "../models/empresa.model";
import { TipoTurno } from "../models/turno/tipo-turno.model";

export const validateTurno = async (data: any, user: any) => {
    if (typeof data.hora != "string") throw ApiError.badRequestError("Hora de turno invalida");
    if (!moment(data.hora, 'HH:mm', true).isValid()) throw ApiError.badRequestError("Hora de turno invalida");

    if (!data.lunes && !data.martes && !data.miercoles && !data.jueves && !data.viernes && !data.sabado && !data.domingo) throw ApiError.badRequestError("Se debe seleccionar al menos un dia");

    if (typeof data.activo != "boolean") throw ApiError.badRequestError("Activo invalido");
    if (data.diasEspeciales && typeof data.diasEspeciales != "boolean") throw ApiError.badRequestError("Dias Especiales invalido");
    if (data.diaNormal && typeof data.diaNormal != "boolean") throw ApiError.badRequestError("Dia normal invalido");

    if (typeof data.descripcion != "string") throw ApiError.badRequestError("Descripcion invalida");

    if (typeof data.tipo != "number") throw ApiError.badRequestError("Tipo de turno no ingresado");
    const tipoTurno = await getRepository(TipoTurno).findOne(data.tipo);
    if (!tipoTurno) throw ApiError.badRequestError("Tipo de turno invalido");

    let empresa;

    if (user.rol.nombre == "Administrador") {
        if (typeof data.empresa != "number") throw ApiError.badRequestError("Empresa no ingresado");
        empresa = await getRepository(Empresa).findOne(data.empresa);
        if (!empresa) throw ApiError.badRequestError("Empresa de turno invalido");
    } else {
        if (!user.empresa) throw ApiError.badRequestError("El usuario no tiene empresa");
        empresa = await getRepository(Empresa).findOne(user.empresa.id);
        if (!empresa) throw ApiError.badRequestError("Empresa de turno invalido");
    }

    data.empresa = empresa;

    switch (tipoTurno.nombre) {
        case "Salida":
            if (typeof data.horaLlegada != "string") throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (!moment(data.horaLlegada, 'HH:mm', true).isValid()) throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (typeof data.destino != "string") throw ApiError.badRequestError("Destino de llegada de turno invalida");

            data.horaSalida = undefined;
            if (!data.salidaDesde || typeof data.salidaDesde != "string") data.salidaDesde = undefined;

            break;

        case "Llegada":
            if (typeof data.horaSalida != "string") throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (!moment(data.horaSalida, 'HH:mm', true).isValid()) throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (typeof data.salidaDesde != "string") throw ApiError.badRequestError("Lugar de salida de turno invalida");

            data.horaLlegada = undefined;
            if (!data.destino || typeof data.destino != "string") data.destino = undefined;

            break;

        case "Pasada":
            if (typeof data.horaSalida != "string") throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (!moment(data.horaSalida, 'HH:mm', true).isValid()) throw ApiError.badRequestError("Hora de Salida de turno invalida");
            if (typeof data.salidaDesde != "string") throw ApiError.badRequestError("Lugar de salida de turno invalida");
            if (typeof data.horaLlegada != "string") throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (!moment(data.horaLlegada, 'HH:mm', true).isValid()) throw ApiError.badRequestError("Hora de Llegada de turno invalida");
            if (typeof data.destino != "string") throw ApiError.badRequestError("Destino de llegada de turno invalida");

            break;

        default:
            break;
    }

    return data;
}