import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { TipoTurno } from 'src/app/models/turno.model';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';

@Component({
  selector: 'app-create-turno',
  templateUrl: './create-turno.component.html',
  styleUrls: ['./create-turno.component.sass']
})
export class CreateTurnoComponent implements OnInit {

  turnoForm: FormGroup;
  empresas: Empresa[];
  tipos: TipoTurno[];

  constructor(
    private title: Title,
    private FormBuilder: FormBuilder,
    private TurnosService: TurnosService,
    private route: ActivatedRoute,
    private empresasService: EmpresasService,
    private router: Router,
    private snackBar: MatSnackBar,
    public tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getTipos();

    this.turnoForm = this.FormBuilder.group({
      hora: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      activo: [true, [Validators.required]],
      lunes: [false, [Validators.required]],
      martes: [false, [Validators.required]],
      miercoles: [false, [Validators.required]],
      jueves: [false, [Validators.required]],
      viernes: [false, [Validators.required]],
      sabado: [false, [Validators.required]],
      domingo: [false, [Validators.required]],
      feriados: [false, [Validators.required]],
      diaNormal: [true, [Validators.required]],
      horaLlegada: [''],
      salidaDesde: [''],
      horaSalida: [''],
      destino: [''],
      empresa: ['', [Validators.required]]
    });

    if (this.tokenService.getRoleName() == 'Empresa') {
      this.turnoForm.removeControl("empresaId");
    } else {
      this.getEmpresas();
    }

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.title.setTitle("Actualizar Turno");

      this.TurnosService.get(IdFromRoute).subscribe(
        ok => {
          this.turnoForm.addControl("id", new FormControl('', [Validators.required]));
          console.log(ok);

          if (typeof ok.tipo != "number") ok.tipo = ok.tipo.id;

          if (typeof ok.empresa != "number") ok.empresa = ok.empresa.id;

          this.turnoForm.patchValue(ok);
        }
      );
    } else {
      this.title.setTitle("Crear Turno");
    }
  }

  getEmpresas(): void {
    this.empresasService.getAll().subscribe(
      ok => {
        this.empresas = ok;
      }
    );
  }

  getTipos(): void {
    this.TurnosService.getTipos().subscribe(
      ok => {
        this.tipos = ok;
      }
    );
  }

  submit() {
    if (this.turnoForm.contains("id")) {
      const id = this.turnoForm.controls.id.value;
      this.TurnosService.update(id, this.turnoForm.value).subscribe(
        ok => {
          this.snackBar.open("Turno creado exitosamente", "Cerrar");
          this.router.navigateByUrl("/turnos");
        },
        err => this.snackBar.open(err.error.message, "Cerrar")
      );
    } else {
      this.TurnosService.create(this.turnoForm.value).subscribe(
        ok => {
          this.snackBar.open("Turno creado exitosamente", "Cerrar");
          this.router.navigateByUrl("/turnos");
        },
        err => this.snackBar.open(err.error.message, "Cerrar")
      );
    }
  }

  // onChangeTipoTurno() {
  //   const tipo = this.turnoForm.controls.tipo.value;

  //   console.log(tipo);

  //   this.turnoForm.removeControl("horaLlegada");
  //   this.turnoForm.removeControl("destino");
  //   this.turnoForm.removeControl("salidaDesde");
  //   this.turnoForm.removeControl("horaSalida");

  //   switch (tipo) {
  //     case 3:
  //       this.turnoForm.addControl("horaLlegada", new FormControl("", [Validators.required]));
  //       this.turnoForm.addControl("destino", new FormControl("", [Validators.required]));
  //       break;

  //     case 1:
  //       this.turnoForm.addControl("salidaDesde", new FormControl("", [Validators.required]));
  //       this.turnoForm.addControl("horaSalida", new FormControl("", [Validators.required]));

  //       break;

  //     case 2:
  //       this.turnoForm.addControl("horaLlegada", new FormControl("", [Validators.required]));
  //       this.turnoForm.addControl("destino", new FormControl("", [Validators.required]));
  //       this.turnoForm.addControl("salidaDesde", new FormControl("", [Validators.required]));
  //       this.turnoForm.addControl("horaSalida", new FormControl("", [Validators.required]));

  //       break;

  //     default:
  //       break;
  //   }
  // }
}
