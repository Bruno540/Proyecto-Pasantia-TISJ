import { ChildEntity, Column } from "typeorm";
import { Turno } from "./turno.model";

@ChildEntity('llegada')
export class Llegada extends Turno {

    @Column()
    salida: string;

}