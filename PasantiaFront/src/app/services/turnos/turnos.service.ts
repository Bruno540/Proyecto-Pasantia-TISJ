import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.Http.get<[Turno[], number]>(this.Url);
  }

  getTipos() {
    return this.Http.get<TipoTurno[]>(this.Url + "/tipos");
  }

  getProximos() {
    return this.Http.get<Turno[]>(this.Url + "/tools/proximos");
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
  
}
