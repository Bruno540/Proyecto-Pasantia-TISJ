import { Coche } from "./coche.model";
import { Turno } from "./turno.model";

export interface Registro {
    id: number;
    observaciones: string;
    toqueAnden: Date;
    turnoId: number;
    cocheId: number;
    coche: Coche;
    turno: Turno;
}