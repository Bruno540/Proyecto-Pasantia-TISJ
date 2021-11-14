import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Turno } from 'src/app/models/turno.model';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { DialogTurnoComponent } from './dialog-turno/dialog-turno.component';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.sass']
})
export class TurnosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'hora', 'salida', 'horaSalida', 'destino', 'type', 'actions'];
  dataSource: Turno[] = [];

  constructor(
    private titleService: Title,
    private TurnosService: TurnosService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Turnos");

    this.TurnosService.getAll().subscribe(
      ok => {
        this.dataSource = ok[0];
      }
    );
  }

  openDialog(turno: Turno) {
    this.dialog.open(DialogTurnoComponent, {
      data: turno
    });
  }
}
