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
import { RegistroLiveComponent } from './components/registro-live/registro-live.component';
import { IndexComponent } from './components/index/index.component';
import { DiasEspecialesComponent } from './components/dias-especiales/dias-especiales.component';
import { CreateDiasEspecialesComponent } from './components/dias-especiales/create-dias-especiales/create-dias-especiales.component';
import { TieneRolGuard } from './guards/tiene-rol/tiene-rol.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: "empresas", component: EmpresasComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
      { path: "empresas/create", component: CreateEmpresaComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
      { path: "empresas/update/:id", component: CreateEmpresaComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },

      { path: "login", component: LoginComponent },

      { path: "usuarios", component: UsuariosComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
      { path: "usuarios/create", component: CreateUsuarioComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
      { path: "usuarios/update/:id", component: CreateUsuarioComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },

      { path: "coches", component: CochesComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
      { path: "coches/create", component: CreateCocheComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
      { path: "coches/update/:id", component: CreateCocheComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },

      { path: "turnos", component: TurnosComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
      { path: "turnos/create", component: CreateTurnoComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },
      { path: "turnos/update/:id", component: CreateTurnoComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador', 'Empresa'] } },

      { path: "registros", component: RegistrosComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
      { path: "registros/create", component: CreateRegistroComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
      { path: "registros/update/:id", component: CreateRegistroComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },

      { path: "dias-especiales", component: DiasEspecialesComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
      { path: "dias-especiales/create", component: CreateDiasEspecialesComponent, canActivate: [AuthGuard, TieneRolGuard], data: { roles: ['Administrador'] } },
    ]
  },

  { path: "registros/live", component: RegistroLiveComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
