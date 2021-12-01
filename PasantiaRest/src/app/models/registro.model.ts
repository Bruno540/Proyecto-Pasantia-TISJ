import { Column, Entity, ManyToOne } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Coche } from "./coche.model";
import { Turno } from "./turno/turno.model";

// export enum EstadoRegistro {
//     ARRIBO = "arribo",
//     PARTIO = "partio"
// }

@Entity("registros")
export class Registro extends ApiBaseEntity {

    @Column({ nullable: true })
    observaciones: string;

    @Column()
    toqueAnden: Date;

    // @Column({
    //     type: "enum",
    //     enum: EstadoRegistro
    // })
    // estado: EstadoRegistro;

    @ManyToOne(() => Turno, turno => turno.registros)
    turno: Turno;

    @ManyToOne(() => Coche, coche => coche.registros)
    coche: Coche;



}

