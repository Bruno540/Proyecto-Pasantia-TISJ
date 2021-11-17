import { Column, Entity, OneToMany } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Coche } from "./coche.model";
import { Turno } from "./turno/turno.model";

@Entity("empresas")
export class Empresa extends ApiBaseEntity {

    @Column()
    rut: string;

    @Column()
    razonSocial: string;

    @Column({nullable: true})
    imagen: string;

    @OneToMany(() => Coche, coche => coche.empresa)
    coches: Coche[];

    @OneToMany(() => Turno, turno => turno.empresa)
    turnos: Turno[];
    
}