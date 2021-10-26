import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { DialogEmpresaComponent } from './dialog-empresa/dialog-empresa.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.sass']
})
export class EmpresasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'rut', 'razonSocial', 'actions'];
  dataSource: Empresa[] = [];

  constructor(
    private EmpresasService: EmpresasService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.EmpresasService.getAll().subscribe(
      ok => {
        this.dataSource = ok;
      }
    );
  }

  openDialog(empresa: Empresa) {
    this.dialog.open(DialogEmpresaComponent, {
      data: empresa
    });
  }

}
