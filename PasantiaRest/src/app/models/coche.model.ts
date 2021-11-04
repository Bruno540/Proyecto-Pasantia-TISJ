import { Column, Entity, ManyToOne } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Empresa } from "./empresa.model";

@Entity("coches")
export class Coche extends ApiBaseEntity {

    @Column()
    numero: string;

    @Column({ unique: true })
    matricula: string;

    @ManyToOne(() => Empresa, empresa => empresa.coches)
    empresa: Empresa;

}