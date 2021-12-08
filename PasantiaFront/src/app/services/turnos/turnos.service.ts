import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TipoTurno, Turno } from 'src/app/models/turno.model';
import { ProyecConfig } from 'src/environments/proyect-config';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private Url = ProyecConfig.backUrl + "turnos";

  constructor(
    private Http: HttpClient
  ) { }

  getAll() {
    return this.Http.get<Turno[]>(this.Url);
  }

  getFiltered(fecha?: Date, horaDesde?: string, horaHasta?: string) {
    let params = {};

    if (fecha) Object.assign(params, { fecha: moment(fecha).format("YYYY-MM-DD") });
    if (horaDesde) Object.assign(params, { horaDesde });
    if (horaHasta) Object.assign(params, { horaHasta });

    return this.Http.get<Turno[]>(this.Url + "/filtered", {
      params
    });
  }

  getLive() {
    return this.Http.get<Turno[]>(this.Url + "/tools/live");
  }

  getTipos() {
    return this.Http.get<TipoTurno[]>(this.Url + "/tipos");
  }

  get(id: number) {
    return this.Http.get<Turno>(this.Url + `/${id}`);
  }

  create(turno: Turno) {
    return this.Http.post(this.Url, turno);
  }

  update(id: number, turno: Turno) {
    return this.Http.put(this.Url + `/${id}`, turno);
  }

  _delete(id: number) {
    return this.Http.delete(this.Url + `/${id}`);
  }

  getProximos() {
    return this.Http.get<Turno[]>(this.Url + "/tools/proximos");
  }
}
