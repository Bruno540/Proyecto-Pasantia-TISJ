import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Coche } from "./coche.model";
import { Turno } from "./turno/turno.model";
import { Usuario } from "./usuario.model";

@Entity("empresas")
export class Empresa extends ApiBaseEntity {

    @Column()
    rut: string;

    @Column()
    razonSocial: string;

    @Column({ nullable: true })
    imagen: string;

    @OneToMany(() => Coche, coche => coche.empresa)
    coches: Coche[];

    @OneToMany(() => Turno, turno => turno.empresa)
    turnos: Turno[];

    @OneToOne(() => Usuario, usuario => usuario.empresa)
    usuario: Usuario;

}