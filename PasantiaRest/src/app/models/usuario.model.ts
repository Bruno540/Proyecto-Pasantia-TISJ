import { Column, Entity } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";

@Entity("usuarios")
export class Usuario extends ApiBaseEntity {

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ select: false })
    password: string;

}