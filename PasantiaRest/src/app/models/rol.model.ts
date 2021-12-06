import { Column, Entity } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";

@Entity("roles")
export class Rol extends ApiBaseEntity {

    @Column({ unique: true })
    nombre: string;

}