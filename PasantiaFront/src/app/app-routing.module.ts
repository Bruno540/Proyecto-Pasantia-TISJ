import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CochesComponent } from './components/coches/coches.component';
import { CreateCocheComponent } from './components/coches/create-coche/create-coche.component';
import { CreateEmpresaComponent } from './components/empresas/create-empresa/create-empresa.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateUsuarioComponent } from './components/usuarios/create-usuario/create-usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { CreateTurnoComponent } from './components/turnos/create-turno/create-turno.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { CreateRegistroComponent } from './components/registros/create-registro/create-registro.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TieneRolGuard } from './guards/tiene-rol/tiene-rol.guard';

const routes: Routes = [
  { path: "home", component: HomeComponent },

  { path: "empresas", component: EmpresasComponent },
  { path: "empresas/create", component: CreateEmpresaComponent },
  { path: "empresas/update/:id", component: CreateEmpresaComponent },

  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },

  { path: "usuarios", component: UsuariosComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
  { path: "usuarios/create", component: CreateUsuarioComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
  { path: "usuarios/update/:id", component: CreateUsuarioComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },

  { path: "coches", component: CochesComponent },
  { path: "coches/create", component: CreateCocheComponent },
  { path: "coches/update/:id", component: CreateCocheComponent },

  { path: "turnos", component: TurnosComponent },
  { path: "turnos/create", component: CreateTurnoComponent },
  { path: "turnos/update/:id", component: CreateTurnoComponent },

  { path: "registros", component: RegistrosComponent },
  { path: "registros/create", component: CreateRegistroComponent },
  { path: "registros/update/:id", component: CreateRegistroComponent },

  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
