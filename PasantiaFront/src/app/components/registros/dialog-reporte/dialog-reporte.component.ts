import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registro } from 'src/app/models/registro.model';
import { RegistrosService } from 'src/app/services/registros/registros.service';

@Component({
  selector: 'app-dialog-reporte',
  templateUrl: './dialog-reporte.component.html',
  styleUrls: ['./dialog-reporte.component.sass']
})
export class DialogReporteComponent implements OnInit {

  fechaDesde : any;
  fechaHasta : any;
  registros : Registro[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  filtrar():void{
    console.log(this.fechaDesde)
    console.log(this.fechaHasta)
    this.router.navigate(['registros/mostrar'],{queryParams: {fechaDesde:this.fechaDesde, fechaHasta:this.fechaHasta}});
  }

}
