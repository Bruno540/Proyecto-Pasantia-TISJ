import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CochesComponent } from './components/coches/coches.component';
import { DialogCocheComponent } from './components/coches/dialog-coche/dialog-coche.component';
import { CreateCocheComponent } from './components/coches/create-coche/create-coche.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TurnosComponent } from './components/turnos/turnos.component';
import { CreateTurnoComponent } from './components/turnos/create-turno/create-turno.component';
import { DialogTurnoComponent } from './components/turnos/dialog-turno/dialog-turno.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { CreateRegistroComponent } from './components/registros/create-registro/create-registro.component';
import { DialogRegistroComponent } from './components/registros/dialog-registro/dialog-registro.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { RegistroLiveComponent } from './components/registro-live/registro-live.component';
import { NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
//const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
import { IndexComponent } from './components/index/index.component';
import { DiasEspecialesComponent } from './components/dias-especiales/dias-especiales.component';
import { CreateDiasEspecialesComponent } from './components/dias-especiales/create-dias-especiales/create-dias-especiales.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthInterceptor } from './middlewares/auth.interceptor';
import { DialogReporteComponent } from './components/registros/dialog-reporte/dialog-reporte.component';
import { MostrarReporteComponent } from './components/registros/mostrar-reporte/mostrar-reporte.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ClockComponent } from './components/clock/clock.component';

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
    DialogUsuarioComponent,
    CochesComponent,
    DialogCocheComponent,
    CreateCocheComponent,
    TurnosComponent,
    CreateTurnoComponent,
    DialogTurnoComponent,
    RegistrosComponent,
    CreateRegistroComponent,
    DialogRegistroComponent,
    HomeComponent,
    NotFoundComponent,
    RegistroLiveComponent,
    IndexComponent,
    DiasEspecialesComponent,
    CreateDiasEspecialesComponent,
    DialogReporteComponent,
    MostrarReporteComponent,
    ClockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    MomentDateModule,
    MatPaginatorModule,
    MatSortModule,
    //SocketIoModule.forRoot(config)
  ],
  exports: [
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['L'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
