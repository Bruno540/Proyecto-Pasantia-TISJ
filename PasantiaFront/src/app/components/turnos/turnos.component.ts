import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  displayedColumns: string[] = ['id', 'hora', 'activo', 'descripcion', 'tipo' ,'actions'];
  dataSource: Turno[] = [];

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
        this.dataSource = ok;
      }
    );
  }

  openDialog(turno: Turno) {
    this.dialog.open(DialogTurnoComponent, {
      data: turno
    });
  }
}
