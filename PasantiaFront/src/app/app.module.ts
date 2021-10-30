import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarButtonsComponent } from './components/navbar/navbar-buttons/navbar-buttons.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { CreateEmpresaComponent } from './components/empresas/create-empresa/create-empresa.component';
import { DialogEmpresaComponent } from './components/empresas/dialog-empresa/dialog-empresa.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreateUsuarioComponent } from './components/usuarios/create-usuario/create-usuario.component';
import { DialogUsuarioComponent } from './components/usuarios/dialog-usuario/dialog-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    NavbarButtonsComponent,
    EmpresasComponent,
    CreateEmpresaComponent,
    DialogEmpresaComponent,
    LoginComponent,
    UsuariosComponent,
    CreateUsuarioComponent,
    DialogUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: 'LOCALSTORAGE', useValue: window.localStorage },
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
