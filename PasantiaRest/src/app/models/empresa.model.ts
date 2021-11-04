import { Column, Entity, OneToMany } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Coche } from "./coche.model";

@Entity("empresas")
export class Empresa extends ApiBaseEntity {

    @Column()
    rut: string;

    @Column()
    razonSocial: string;

    @OneToMany(() => Coche, coche => coche.empresa)
    coches: Coche[];

}