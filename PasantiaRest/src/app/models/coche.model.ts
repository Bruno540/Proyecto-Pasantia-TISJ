import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Empresa } from "./empresa.model";
import { Registro } from "./registro.model";

@Entity("coches")
export class Coche extends ApiBaseEntity {

    @Column()
    numero: string;

    @Column({ unique: true })
    matricula: string;

    @ManyToOne(() => Empresa, empresa => empresa.coches, { onDelete: 'CASCADE' })
    empresa: Empresa;

    @OneToMany(() => Registro, registro => registro.turno)
    registros: Registro[];

}