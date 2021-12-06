import { Column, Entity } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";

@Entity("dias-especiales")
export class DiaEspecial extends ApiBaseEntity {

    @Column({ nullable: true })
    nombre: string;

    @Column()
    fecha: Date;

}