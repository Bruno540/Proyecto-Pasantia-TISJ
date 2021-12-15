import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Registro } from 'src/app/models/registro.model';
import { RegistrosService } from 'src/app/services/registros/registros.service';

@Component({
  selector: 'app-mostrar-reporte',
  templateUrl: './mostrar-reporte.component.html',
  styleUrls: ['./mostrar-reporte.component.sass']
})
export class MostrarReporteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'observaciones', 'toqueAnden', 'tipo','hora','origen','destino', 'cocheNro','matricula','empresa'];
  fechaDesde: any;
  fechaHasta: any;
  registros: any[] = []
  tipoid: any;
  total: any;

  constructor(private service: RegistrosService, private router: ActivatedRoute) { 
    this.router.queryParams.subscribe(data=>{
      this.fechaDesde = moment(data.fechaDesde).format('YYYY-MM-DD');
      this.fechaHasta = moment(data.fechaHasta).format('YYYY-MM-DD');
      this.tipoid = data.tipoTurno;
    })
  }

  ngOnInit(): void {
    console.log('estamos aca', this.tipoid);
    if(this.tipoid==="0"){
      
      this.service.allreportes(this.fechaDesde,this.fechaHasta).subscribe(data=>{
        this.registros = data;
        this.total = this.registros.length;
      })
    }else{
      this.service.reportes(this.fechaDesde,this.fechaHasta, this.tipoid).subscribe(data=>{
        this.registros = data;
        this.total = this.registros.length;
      })
    }
  }

  print(){
    window.print();
  }

}
