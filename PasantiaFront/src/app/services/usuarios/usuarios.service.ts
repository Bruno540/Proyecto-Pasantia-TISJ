import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ProyecConfig } from 'src/environments/proyect-config';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private Url = ProyecConfig.backUrl + "usuarios";

  constructor( private Http: HttpClient) { }

  getAll() {
    return this.Http.get<Usuario[]>(this.Url);
  }

  get(id: number) {
    return this.Http.get<Usuario>(this.Url + `/${id}`);
  }

  create(usuario: Usuario) {
    console.log("El usuario es: ", usuario);
    return this.Http.post(this.Url, usuario);
  }

  update(id: number, usuario: Usuario) {
    return this.Http.put(this.Url + `/${id}`, usuario);
  }

  _delete(id: number) {
    return this.Http.delete(this.Url + `/${id}`);
  }
}
