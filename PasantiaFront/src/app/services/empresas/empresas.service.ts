import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coche } from 'src/app/models/coche.model';
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

  getCoches(id: number) {
    return this.Http.get<Coche[]>(this.Url + `/coches/${id}`);
  }

  create(empresa: Empresa, file:File) {
    const formData: FormData = new FormData();
    if(file!=null){
      formData.append('imagen', file,file.name);
    }
    formData.append('razonSocial', empresa.razonSocial);
    formData.append('rut',empresa.rut);
    return this.Http.post(this.Url, formData);
  }

  update(id: number, empresa: Empresa, file:File) {
    const formData: FormData = new FormData();
    if(file!=null){
      formData.append('imagen', file,file.name);
    }
    formData.append('razonSocial', empresa.razonSocial);
    formData.append('rut',empresa.rut);
    return this.Http.put(this.Url + `/${id}`, formData);
  }

  _delete(id: number) {
    return this.Http.delete(this.Url + `/${id}`);
  }

}
