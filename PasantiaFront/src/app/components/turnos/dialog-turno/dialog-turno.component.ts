import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Turno } from 'src/app/models/turno.model';
import { TurnosService } from 'src/app/services/turnos/turnos.service';

@Component({
  selector: 'app-dialog-turno',
  templateUrl: './dialog-turno.component.html',
  styleUrls: ['./dialog-turno.component.sass']
})
export class DialogTurnoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Turno,
    private TurnosService: TurnosService
  ) { }

  ngOnInit(): void {
  }

  _delete(id: string) {
    this.TurnosService._delete(id).subscribe();
    window.location.reload();
  }
}
