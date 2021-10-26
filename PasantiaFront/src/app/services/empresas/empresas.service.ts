import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { ProyecConfig } from 'src/environments/proyect-config';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private Url = ProyecConfig.backUrl + "empresas";

  constructor(
    private Http: HttpClient
  ) { }

  getAll() {
    return this.Http.get<Empresa[]>(this.Url);
  }

  get(id: number) {
    return this.Http.get<Empresa>(this.Url + `/${id}`);
  }

  create(empresa: Empresa) {
    return this.Http.post(this.Url, empresa);
  }

  update(id: number, empresa: Empresa) {
    return this.Http.put(this.Url + `/${id}`, empresa);
  }

  _delete(id: number) {
    return this.Http.delete(this.Url + `/${id}`);
  }

}
