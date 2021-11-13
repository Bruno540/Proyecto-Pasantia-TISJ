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
import { RegistrosComponent } from './components/registros/registros.component';
import { CreateRegistroComponent } from './components/registros/create-registro/create-registro.component';

const routes: Routes = [
  { path: "empresas", component: EmpresasComponent },
  { path: "empresas/create", component: CreateEmpresaComponent },
  { path: "empresas/update/:id", component: CreateEmpresaComponent },
  { path: "login", component: LoginComponent, canActivate:[AuthGuard]},
  { path: "usuarios", component: UsuariosComponent },
  { path: "usuarios/create", component: CreateUsuarioComponent },
  { path: "usuarios/update/:id", component: CreateUsuarioComponent },
  { path: "coches", component: CochesComponent },
  { path: "coches/create", component: CreateCocheComponent },
  { path: "coches/update/:id", component: CreateCocheComponent },
  { path: "registros", component: RegistrosComponent },
  { path: "registros/create", component: CreateRegistroComponent },
  { path: "registros/update/:id", component: CreateRegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
