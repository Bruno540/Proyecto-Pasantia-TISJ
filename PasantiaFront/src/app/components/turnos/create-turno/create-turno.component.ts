import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TurnosService } from 'src/app/services/turnos/turnos.service';

@Component({
  selector: 'app-create-turno',
  templateUrl: './create-turno.component.html',
  styleUrls: ['./create-turno.component.sass']
})
export class CreateTurnoComponent implements OnInit {

  turnoForm: FormGroup;

  constructor(
    private title: Title,
    private FormBuilder: FormBuilder,
    private TurnosService: TurnosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.turnoForm = this.FormBuilder.group({
      hora: ['', [Validators.required]],
      salida: ['', [Validators.required]],
      horaSalida: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.title.setTitle("Actualizar Turno");

      this.TurnosService.get(IdFromRoute).subscribe(
        ok => {
          this.turnoForm.addControl("id", new FormControl('', [Validators.required]));

          this.turnoForm.patchValue(ok);
        }
      );
    } else {
      this.title.setTitle("Crear Turno");
    }
  }

  submit() {
    if (this.turnoForm.contains("id")) {
      const id = this.turnoForm.controls.id.value;
      this.TurnosService.update(id, this.turnoForm.value).subscribe();
    } else {
      this.TurnosService.create(this.turnoForm.value).subscribe();
    }
  }

}
