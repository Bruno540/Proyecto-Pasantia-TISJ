import { Column, Entity, JoinTable, ManyToMany, TableInheritance } from "typeorm";
import { ApiBaseEntity } from "../base-entity.model";
import { Dia } from "./dia.model";

@Entity('turnos')
@TableInheritance({ pattern: 'STI', column: { type: 'varchar', name: 'type' } })
export class Turno extends ApiBaseEntity {

    @Column()
    hora: string;

    @Column()
    activa: boolean;

    @ManyToMany(() => Dia)
    @JoinTable()
    dias: Dia[];

}