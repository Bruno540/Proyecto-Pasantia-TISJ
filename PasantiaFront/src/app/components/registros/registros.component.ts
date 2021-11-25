import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Registro } from 'src/app/models/registro.model';
import { RegistrosService } from 'src/app/services/registros/registros.service';
import { DialogRegistroComponent } from './dialog-registro/dialog-registro.component';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.sass']
})
export class RegistrosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'observaciones', 'toqueAnden', 'cocheNro', 'matricula', 'empresa', 'actions'];
  dataSource: Registro[] = [];

  constructor(
    private RegistroService: RegistrosService,
    public dialog: MatDialog,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Registros");
    this.RegistroService.getAll().subscribe(ok => {
      this.dataSource = ok;
    });
  }

  openDialog(registro: Registro) {
    this.dialog.open(DialogRegistroComponent, {
      data: registro
    });
  }

}