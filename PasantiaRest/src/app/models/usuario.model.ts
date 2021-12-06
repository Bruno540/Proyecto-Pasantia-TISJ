import { Column, Entity } from "typeorm";
import { ApiBaseEntity } from "./base-entity.model";

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