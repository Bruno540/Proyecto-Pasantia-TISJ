import { Column, Entity } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";

@Entity("empresas")
export class Empresa extends ApiBaseEntity {

    @Column()
    rut: string;

    @Column()
    razonSocial: string;

}