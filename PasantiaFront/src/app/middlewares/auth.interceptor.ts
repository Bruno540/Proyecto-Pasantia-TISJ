import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/auth/tokenstorage/tokenstorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        const clone = request.clone({
            headers: request.headers.set("Authorization", `Bearer ${this.tokenService.getToken()}`)
        });
        
        return next.handle(clone);
    }
}