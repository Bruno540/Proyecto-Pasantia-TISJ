import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Registro } from 'src/app/models/registro.model';
import { TipoTurno } from 'src/app/models/turno.model';
import { TurnosService } from 'src/app/services/turnos/turnos.service';

@Component({
  selector: 'app-dialog-reporte',
  templateUrl: './dialog-reporte.component.html',
  styleUrls: ['./dialog-reporte.component.sass']
})
export class DialogReporteComponent implements OnInit {

  turnoForm: FormGroup;
  fechaDesde : any;
  fechaHasta : any;
  registros : Registro[];
  tipos: TipoTurno[];
  tipoTurno : any;

  constructor(private router: Router,  private TurnosService: TurnosService,private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTipos();
    this.turnoForm = this.FormBuilder.group({
      tipo: ['', [Validators.required]],
      fechaDesde: [moment()],
      fechaHasta: [moment()],
    });
  }

  filtrar():void{
    this.fechaDesde = this.turnoForm.get('fechaDesde')?.value;
    this.fechaHasta = this.turnoForm.get('fechaHasta')?.value;
    this.tipoTurno = this.turnoForm.get('tipo')?.value;
    console.log(this.fechaDesde)
    console.log(this.fechaHasta)
    console.log(this.tipoTurno)
    this.router.navigate(['registros/mostrar'],{queryParams: {fechaDesde:this.fechaDesde, fechaHasta:this.fechaHasta, tipoTurno:this.tipoTurno}});
  }

  getTipos(): void {
    this.TurnosService.getTipos().subscribe(
      ok => {
        this.tipos = ok;
      }
    );
  }

}
