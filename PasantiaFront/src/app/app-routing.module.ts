import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpresaComponent } from './components/empresas/create-empresa/create-empresa.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "empresas", component: EmpresasComponent },
  { path: "empresas/create", component: CreateEmpresaComponent },
  { path: "empresas/update/:id", component: CreateEmpresaComponent },
  { path: "login", component: LoginComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
