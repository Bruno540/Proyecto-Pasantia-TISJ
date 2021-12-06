import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TieneRolGuard implements CanActivate {
  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let roles = route.data.roles as Array<string>;
    const rol = this.tokenService.getRoleName()

    if (this.tokenService.getToken() && rol) {
      if (roles.find((rol) => rol == "Administrador") && rol == "Administrador") {
        return true;
      }

      if (roles.find((rol) => rol == "Empresa") && rol == "Empresa") {
        return true;
      }

      if (roles.find((rol) => rol == "Usuario") && rol == "Usuario") {
        return true;
      }
    }

    this.snackBar.open("Acceso Denegado", "Close", { duration: 5000 });
    this.router.navigateByUrl("/");
    return false;
  }

}
