import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
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
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Empresas")

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
