import { Column, Entity, ManyToMany } from "typeorm";
import { ApiBaseEntity } from "../base-entity.model";
import { Turno } from "./turno.model";

@Entity('dias')
export class Dia extends ApiBaseEntity {

    @Column()
    nombre: string;
    
}