import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ApiBaseEntity } from "../base-entity.model";
import { Empresa } from "../empresa.model";
import { Registro } from "../registro.model";
import { TipoTurno } from "./tipo-turno.model";

@Entity('turnos')
export class Turno extends ApiBaseEntity {

    @Column({ type: 'time' })
    hora: string;

    @Column()
    activo: boolean;

    @Column({ default: false })
    lunes: boolean;

    @Column({ default: false })
    martes: boolean;

    @Column({ default: false })
    miercoles: boolean;

    @Column({ default: false })
    jueves: boolean;

    @Column({ default: false })
    viernes: boolean;

    @Column({ default: false })
    sabado: boolean;

    @Column({ default: false })
    domingo: boolean;

    @Column({ default: false })
    diasEspeciales: boolean;

    @Column({ default: true })
    diaNormal: boolean;

    @Column({ type: "text" })
    descripcion: boolean;

    @Column({ default: "San José" })
    salidaDesde: string;

    @Column({ type: 'time', nullable: true })
    horaSalida: string;

    @Column({ default: "San José" })
    destino: string;

    @Column({ type: 'time', nullable: true })
    horaLlegada: string;

    @ManyToOne(() => TipoTurno, tipo => tipo.turnos)
    tipo: TipoTurno;

    @OneToMany(() => Registro, registro => registro.turno)
    registros: Registro[];

    @ManyToOne(() => Empresa, empresa => empresa.turnos, { onDelete: 'CASCADE' })
    empresa: Empresa;

}


