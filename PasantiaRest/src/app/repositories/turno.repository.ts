import moment, { now } from "moment";
import { Between, Brackets, EntityRepository, getConnection, getRepository, In, Repository } from "typeorm";
import { EstadoRegistro, Turno } from "../models/turno/turno.model";
import { DiaSemana } from "../util/obtenerDia";
import { ApiError } from "../../config/api-error";
import { Registro } from "../models/registro.model";
import { DiaEspecial } from "../models/dia-especial.model";


@EntityRepository(Turno)
export class TurnoRepository extends Repository<Turno> {

    async findAll(query: any) {
        var dia = moment().day();
        var diaSemana = DiaSemana.obtenerDia(dia);
        if(!diaSemana) throw new ApiError("No existe el dia de la semana"); 
        return await this.findAndCount({
            skip: query.skip ?? "",
            take: query.take ?? "",
            where: 
                {
                    activo: true,
                    [diaSemana] : true
                },
            relations: ["empresa", "tipo"],
            order:{'hora':'ASC'}
        })
    }

    findProximos = async (): Promise<Turno[] | undefined> => {
        var dia = moment().day();
        var diaSemana = DiaSemana.obtenerDia(dia);
        const diasTurno = await this.getDiaNormalEspecial();
        if(!diaSemana) throw new ApiError("No existe el dia de la semana"); 
        const rango = process.env.PROXIMOS_RANGO;
        var arriba = moment().add(rango,'minutes').format("HH:mm:ss");
        var abajo = moment().subtract(rango,'minutes').format('HH:mm:ss');
        return await getRepository(Turno).find({
            where: 
                {
                    hora: Between(abajo,arriba),
                    activo: true,
                    [diaSemana] : true,
                    diasEspeciales: In(diasTurno.diasEspeciales),
                    diaNormal:In(diasTurno.diaNormal)
                },
            relations: ["empresa", "tipo"],
            order:{'hora':'ASC'}
        });
    }

    getDiaNormalEspecial = async(): Promise<any> =>{
        let diaNormal;
        let diasEspeciales: any = [!!await getRepository(DiaEspecial).findOne({
            where:{
                fecha:moment().format("YYYY-MM-DD")
            }
        })];
        if(!diasEspeciales[0]){
            diaNormal = [true];
            diasEspeciales = [true, false]
        }
        else{
            diaNormal = [true,false]
        }
        return {
            diaNormal,
            diasEspeciales
        }
    }

    liveTurnos = async (): Promise<Turno[] | undefined> => {
        const dia = moment();
        const diasTurno = await this.getDiaNormalEspecial();
        const diaSemana = DiaSemana.obtenerDia(dia.day());
        if(!diaSemana) throw new ApiError("No existe el dia de la semana"); 
        const horasArriba = process.env.LIVE_RANGO_SUPERIOR;
        const horasAbajo = process.env.LIVE_RANGO_INFERIOR;
        const horasRegistro = process.env.LIVE_RANGO_REGISTRO;
        let arriba = moment().add(horasArriba,'hours');
        let abajo = moment().subtract(horasAbajo,'hours');
        let between = `turno.hora BETWEEN '${abajo.format("HH:mm")}' AND '${arriba.format("HH:mm")}'`;
        if(arriba>dia.endOf('day')){
            between = `turno.hora BETWEEN '${moment().add(horasArriba,'hours').startOf('day').format("HH:mm")}' AND '${arriba.format("HH:mm")}'`;
            arriba = moment().endOf('day');
        }
        else if(abajo<dia.startOf('day')){
            between = `turno.hora BETWEEN '${abajo.format("HH:mm")}' AND '${moment().subtract(horasAbajo,'hours').endOf('day').format("HH:mm")}'`;
            abajo = moment().startOf('day');
        }
        // const turnos = await getRepository(Turno).find({
        //         where:{
        //             hora: Between(abajo.format("HH:mm"),arriba.format("HH:mm")), 
        //             activo: true,
        //             [diaSemana] : true,
        //             diasEspeciales: In(diasTurno.diasEspeciales),
        //             diaNormal:In(diasTurno.diaNormal)
        //         },
        //         relations: ["empresa", "tipo","registros"],
        //         order:{'hora':'DESC'}
        // });
         const turnos = await getRepository(Turno)
            .createQueryBuilder("turno")
            //.leftJoinAndSelect("turno.registros", "registro")
            .leftJoinAndSelect("turno.tipo", "tipo")
            .leftJoinAndSelect("turno.empresa", "empresa")
            .groupBy("turno.id")
            //.addGroupBy("registro.id")
            .addGroupBy("tipo.id")
            .addGroupBy("empresa.id")
            .where('turno.activo = :activo',{activo: true})
            .andWhere(`turno.${diaSemana}= :dia`,{dia: true})
            .andWhere(`turno.diasEspeciales IN(${diasTurno.diasEspeciales.toString()})`)
            .andWhere(`turno.diaNormal IN(${diasTurno.diaNormal.toString()})`)
            .andWhere(new Brackets(qb => {
                qb.where('turno.hora BETWEEN :abajo AND :arriba',{abajo:abajo.format("HH:mm"),arriba:arriba.format("HH:mm")})
                  .orWhere(between)
            }))
            .orderBy("turno.hora","DESC")
            .getMany();
        const turnosExtra:Turno[] = [];
        for (var [index, turno] of turnos.entries()) { 
             const horaTurno = moment(turno.hora, ['H:m']);
             const toqueArriba = moment(turno.hora, ['H:m']).add(horasRegistro,'hours').toDate();
             const toqueAbajo = moment(turno.hora, ['H:m']).subtract(horasRegistro,'hours').toDate();
             const registros = await getRepository(Registro).find({
                 where: {
                    turno: turno.id,
                    toqueAnden: Between(toqueAbajo, toqueArriba)
                 },
                 relations:["coche"]
             });
             if(turno.tipo.nombre === "Salida"){
                 let primero = true;
                 if(!registros.length){
                    if(horaTurno.isBefore(moment())){
                        turno.estado = EstadoRegistro.RETRASADO;
                    }
                    else{
                        turno.estado = EstadoRegistro.NOPARTIO;
                    }
                 }
                 else{
                    for(const registro of registros){
                        if(primero){
                            turno.estado = EstadoRegistro.PARTIO;
                            turno.coche = registro.coche.numero;
                            primero = false;
                        }
                        else{
                            const newTurno = this.cloneTurno(turno);
                            newTurno.estado = EstadoRegistro.PARTIO;
                            newTurno.coche = registro.coche.numero;
                            turnosExtra.push(newTurno);
                        }
                    }  
                }
             }
             if(turno.tipo.nombre === "Llegada"){
                 let primero = true;
                 if(!registros.length){
                    if(horaTurno.isBefore(moment())){
                        turno.estado = EstadoRegistro.RETRASADO;
                    }
                    else{
                        turno.estado = EstadoRegistro.NOARRIBO;
                    }
                 }
                 else{
                    for(const registro of registros){
                        if(primero){
                            turno.estado = EstadoRegistro.ARRIBO;
                            turno.coche = registro.coche.numero;
                            primero = false;
                        }
                        else{
                            const newTurno = this.cloneTurno(turno);
                            newTurno.estado = EstadoRegistro.ARRIBO;
                            newTurno.coche = registro.coche.numero;
                            turnosExtra.push(newTurno);
                        }
                    }  
                }
                    
            }
            if(turno.tipo.nombre === "Pasada"){
                let primero = true;
                if(!registros.length){
                   if(horaTurno.isBefore(moment())){
                       turno.estado = EstadoRegistro.RETRASADO;
                   }
                   else{
                       turno.estado = EstadoRegistro.NOARRIBO;
                   }
                }
                else{
                   for(const registro of registros){
                        if(primero){
                            turno.estado = EstadoRegistro.ARRIBO;
                            turno.coche = registro.coche.numero;
                            primero = false;
                        }
                        else{
                            const encontrado = turnosExtra.filter(x => x.coche===registro.coche.numero && x.id===turno.id)[0] ?? turnos.filter(x => x.coche===registro.coche.numero && x.id===turno.id)[0];
                            if(encontrado){
                                encontrado.estado = EstadoRegistro.PARTIO;
                            }
                            else{
                                const newTurno = this.cloneTurno(turno);
                                newTurno.estado = EstadoRegistro.ARRIBO;
                                newTurno.coche = registro.coche.numero;
                                turnosExtra.push(newTurno);
                            }
                        }
                   }  
               }
            }
             
             /*
              if(turno.tipo.nombre === "Salida"){
                     if(registros.length === 1){
                         turno.estado = EstadoRegistro.PARTIO
                     }else{
                         if(registros.length === 0){
                             if(horaTurno < moment()){
                                 turno.estado = EstadoRegistro.RETRASADO
                             }else{
                                 turno.estado = EstadoRegistro.NOPARTIO
                             }
                         }
                     }
                 }
                 if(turno.tipo.nombre === "Llegada"){
                     if(registros.length === 1){
                         turno.estado = EstadoRegistro.ARRIBO
                     }else{
                         if(registros.length === 0){
                             if(horaTurno < moment()){
                                 turno.estado = EstadoRegistro.RETRASADO
                             }else{
                                 turno.estado = EstadoRegistro.NOARRIBO
                             }
                         }
                     }
                 }
                 if(turno.tipo.nombre === "Pasada"){
                     if(registros.length === 1){
                         turno.estado = EstadoRegistro.ARRIBO;
                     }else{
                         if(registros.length === 0){
                             if(horaTurno < moment()){
                                 turno.estado = EstadoRegistro.RETRASADO;
                             }else{
                                 turno.estado = EstadoRegistro.NOARRIBO;
                             }
                         }else{
                             turno.estado = EstadoRegistro.PARTIO;
                         }
                     }
                 }*/ 
        }
        const resultadoFinal = turnos.concat(turnosExtra);
        return resultadoFinal.sort(function(o1,o2){
            const inicio = moment(o1.hora,"HH:mm:ss");
            const final = moment(o2.hora, "HH:mm:ss");
            if (inicio.isBefore(final))   
                return 1;
            if(inicio.isAfter(final)) 
                return  -1;
            return  0;
        });
    }
    cloneTurno = (turno: Turno) => {
        const newTurno = new Turno();
        newTurno.hora = turno.hora;
        newTurno.horaLlegada = turno.horaLlegada;
        newTurno.horaSalida = turno.horaSalida;
        newTurno.id = turno.id;
        newTurno.lunes = turno.lunes;
        newTurno.martes = turno.martes;
        newTurno.miercoles = turno.miercoles;
        newTurno.jueves = turno.jueves;
        newTurno.viernes = turno.viernes;
        newTurno.sabado = turno.sabado;
        newTurno.domingo = turno.domingo;
        newTurno.empresa = turno.empresa;
        newTurno.estado = turno.estado;
        newTurno.salidaDesde = turno.salidaDesde;
        newTurno.destino = turno.destino;
        newTurno.diaNormal = turno.diaNormal;
        newTurno.diasEspeciales = turno.diasEspeciales;
        newTurno.activo = turno.activo;
        newTurno.tipo = turno.tipo;
        newTurno.registros= turno.registros;
        newTurno.descripcion = turno.descripcion
        return newTurno;
    }
}