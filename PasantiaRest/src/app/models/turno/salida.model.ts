import { ChildEntity, Column } from "typeorm";
import { Turno } from "./turno.model";

@ChildEntity('salida')
export class Salida extends Turno {

    @Column()
    destino: string;

}