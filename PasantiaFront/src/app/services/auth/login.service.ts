import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';
import { ProyecConfig } from 'src/environments/proyect-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url = ProyecConfig.backUrl + "authentication/";

  constructor(
    private Http: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) { }


  login(email: string, password: string): Observable<any> {
    return this.Http.post(this.Url +'login', {
      email,
      password
    });
  }

 

}
