import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiasEspeciales } from 'src/app/models/dias-especiales.model';
import { ProyecConfig } from 'src/environments/proyect-config';

@Injectable({
  providedIn: 'root'
})
export class DiasEspecialesService {

  private Url = ProyecConfig.backUrl + "dias-especiales";

  constructor(private Http: HttpClient) { }

  getAll() {
    return this.Http.get<DiasEspeciales[]>(this.Url);
  }

  get(id: number) {
    return this.Http.get<DiasEspeciales>(this.Url + `/${id}`);
  }

  create(data: any) {
    return this.Http.post(this.Url, data);
  }

  _delete(id: number) {
    return this.Http.delete(this.Url + `/${id}`);
  }

}
