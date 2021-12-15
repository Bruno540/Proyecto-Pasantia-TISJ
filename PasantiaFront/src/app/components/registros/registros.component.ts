import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Registro } from 'src/app/models/registro.model';
import { RegistrosService } from 'src/app/services/registros/registros.service';
import { DialogRegistroComponent } from './dialog-registro/dialog-registro.component';
import { DialogReporteComponent } from './dialog-reporte/dialog-reporte.component';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.sass']
})
export class RegistrosComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  displayedColumns: string[] = ['id', 'observaciones', 'toqueAnden', 'cocheNro','matricula','empresa', 'actions'];
  //dataSource: Registro[] = [];
  dataSource: any;

  constructor(private RegistroService: RegistrosService, public dialog:MatDialog,private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Registros");
    this.RegistroService.getDia().subscribe(ok=>{
      this.dataSource = new MatTableDataSource<Registro>(ok);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(registro: Registro) {
    this.dialog.open(DialogRegistroComponent, {
      data: registro
    });
  }

  openDialogReportes() {
    this.dialog.open(DialogReporteComponent);
  }

}