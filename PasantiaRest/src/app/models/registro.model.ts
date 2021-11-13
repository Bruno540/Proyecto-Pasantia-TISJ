import { Column, Entity, ManyToOne } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Coche } from "./coche.model";
import { Turno } from "./turno/turno.model";

@Entity("registros")
export class Registro extends ApiBaseEntity {

    @Column({ nullable: true })
    observaciones: string;

    @Column()
    toqueAnden: Date;

    @ManyToOne(() => Turno, turno => turno.registros)
    turno: Turno;

    @ManyToOne(() => Coche, coche => coche.registros)
    coche: Coche;

}