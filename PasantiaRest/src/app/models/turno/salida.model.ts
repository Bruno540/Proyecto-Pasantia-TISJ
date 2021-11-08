import { ChildEntity, Column } from "typeorm";
import { Turno } from "./turno.model";

@ChildEntity('Salida')
export class Salida extends Turno {

    @Column()
    destino: string;

}