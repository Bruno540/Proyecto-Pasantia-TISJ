import { Empresa } from "./empresa.model";
import { Registro } from "./registro.model";

export class TipoTurno {

    id: number;

    nombre: string;

}

export class Turno {
    id: number;

    hora: string;

    activo: boolean;

    lunes: boolean;

    martes: boolean;

    miercoles: boolean;

    jueves: boolean;

    viernes: boolean;

    sabado: boolean;

    domingo: boolean;

    feriados: boolean;

    diaNormal: boolean;

    descripcion: boolean;

    salidaDesde?: string;

    horaSalida?: string;

    destino?: string;

    horaLlegada?: string;

    tipo: Turno | number;

    registros: Registro[];

    empresa: any;

}