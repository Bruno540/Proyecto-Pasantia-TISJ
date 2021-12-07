import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  displayedColumns: string[] = ['id', 'rut', 'razonSocial','actions'];
  //dataSource: Empresa[] = [];
  dataSource: any;
  
  constructor(
    private EmpresasService: EmpresasService,
    public dialog: MatDialog,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Empresas")

    this.EmpresasService.getAll().subscribe(
      ok => {
        //this.dataSource = ok;
        this.dataSource = new MatTableDataSource<Empresa>(ok);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  openDialog(empresa: Empresa) {
    this.dialog.open(DialogEmpresaComponent, {
      data: empresa
    });
  }

}
