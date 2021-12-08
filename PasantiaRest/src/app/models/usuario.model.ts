import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";
import { Empresa } from "./empresa.model";
import { Rol } from "./rol.model";

@Entity("usuarios")
export class Usuario extends ApiBaseEntity {

    @Column()
    email: string;

    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column({ select: false })
    password: string;

    @ManyToOne(() => Rol)
    rol: Rol;

    @OneToOne(() => Empresa, empresa => empresa.usuario, { onDelete: 'CASCADE' })
    @JoinColumn()
    empresa: Empresa;

}