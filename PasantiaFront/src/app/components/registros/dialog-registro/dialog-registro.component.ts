import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Registro } from 'src/app/models/registro.model';
import { RegistrosService } from 'src/app/services/registros/registros.service';

@Component({
  selector: 'app-dialog-registro',
  templateUrl: './dialog-registro.component.html',
  styleUrls: ['./dialog-registro.component.sass']
})
export class DialogRegistroComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Registro,
  private RegistroService: RegistrosService) { }

  ngOnInit(): void {
  }

  _delete(id: number) {
    this.RegistroService._delete(id).subscribe();
    window.location.reload();
  }

}
