import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Turno } from 'src/app/models/turno.model';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { DialogTurnoComponent } from './dialog-turno/dialog-turno.component';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.sass']
})
export class TurnosComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  displayedColumns: string[] = ['id', 'hora', 'activo', 'descripcion', 'tipo' ,'actions'];
  //dataSource: Turno[] = [];
  dataSource: any;

  constructor(
    private titleService: Title,
    private TurnosService: TurnosService,
    public dialog: MatDialog,
    public tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Turnos");

    if (this.tokenService.getRoleName() == 'Administrador') {
      this.displayedColumns.splice(this.displayedColumns.length - 1, 0, 'empresa');
    }
    
    this.TurnosService.getAll().subscribe(
      ok => {
        //this.dataSource = ok;
        this.dataSource = new MatTableDataSource<Turno>(ok);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  openDialog(turno: Turno) {
    this.dialog.open(DialogTurnoComponent, {
      data: turno
    });
  }
}
