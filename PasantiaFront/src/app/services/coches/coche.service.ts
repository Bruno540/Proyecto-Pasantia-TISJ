import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coche } from 'src/app/models/coche.model';
import { ProyecConfig } from 'src/environments/proyect-config';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  private Url = ProyecConfig.backUrl + "coches";

  constructor(private Http: HttpClient) { }

  getAll() {
    return this.Http.get<Coche[]>(this.Url);
  }

  get(id: number) {
    return this.Http.get<Coche>(this.Url + `/${id}`);
  }

  create(coche: Coche) {
    console.log(coche);
    return this.Http.post(this.Url, coche);
  }

  update(id: number, coche: Coche) {
    return this.Http.put(this.Url + `/${id}`, coche);
  }

  _delete(id: number) {
    console.log(id)
    return this.Http.delete(this.Url + `/${id}`);
  }
}
