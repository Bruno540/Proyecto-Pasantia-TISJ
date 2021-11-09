import { ChildEntity, Column } from "typeorm";
import { Turno } from "./turno.model";

@ChildEntity('Llegada')
export class Llegada extends Turno {

    @Column()
    salida: string;

}