import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { ProyecConfig } from 'src/environments/proyect-config';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  private Url = ProyecConfig.backUrl + "registros";

  constructor(private Http: HttpClient) { }

  getAll() {
    return this.Http.get<Registro[]>(this.Url);
  }

  findUltimos() {
    return this.Http.get<Registro[]>(this.Url+'/tools/ultimos');
  }

  get(id: number) {
    return this.Http.get<Registro>(this.Url + `/${id}`);
  }

  create(registro: Registro) {
    console.log(registro);
    return this.Http.post(this.Url, registro);
  }

  update(id: number, registro: Registro) {
    return this.Http.put(this.Url + `/${id}`, registro);
  }

  _delete(id: number) {
    return this.Http.delete(this.Url + `/${id}`);
  }

  reportes(fechaDesde: any, fechaHasta:any) {
    return this.Http.get<Registro[]>(this.Url + `/tools/reportes?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}` );
  }
}
