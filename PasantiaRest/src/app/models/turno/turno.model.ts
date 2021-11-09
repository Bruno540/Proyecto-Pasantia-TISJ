import { Column, Entity, JoinTable, ManyToMany, TableInheritance } from "typeorm";
import { ApiBaseEntity } from "../base-entity.model";
import { Dia } from "./dia.model";

@Entity('turnos')
@TableInheritance({ pattern: 'STI', column: { type: 'varchar', name: 'type' } })
export abstract class Turno extends ApiBaseEntity {

    @Column()
    hora: string;

    @Column()
    activo: boolean;

    @ManyToMany(() => Dia)
    @JoinTable()
    dias: Dia[];

    @Column()
    type: string;
}