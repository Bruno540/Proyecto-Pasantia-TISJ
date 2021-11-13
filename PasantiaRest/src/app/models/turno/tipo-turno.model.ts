import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Turno } from "./turno.model";

@Entity("tipos-turno")
export class TipoTurno extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nombre: string;

    @OneToMany(() => Turno, turno => turno.tipo)
    turnos: Turno[];

}