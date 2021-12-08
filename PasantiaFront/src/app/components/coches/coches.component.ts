import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Coche } from 'src/app/models/coche.model';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';
import { CocheService } from 'src/app/services/coches/coche.service';
import { DialogCocheComponent } from './dialog-coche/dialog-coche.component';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrls: ['./coches.component.sass']
})
export class CochesComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  displayedColumns: string[] = ['id', 'numero', 'matricula', 'actions'];
  //dataSource: Coche[] = [];
  dataSource: any;

  constructor(
    private CocheService: CocheService,
    public dialog: MatDialog,
    private titleService: Title,
    public tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Coches");

    if (this.tokenService.getRoleName() == 'Administrador') {
      this.displayedColumns.splice(this.displayedColumns.length - 1, 0, 'empresa');
    }

    this.CocheService.getAll().subscribe(
      ok => {
        //this.dataSource = ok;
        this.dataSource = new MatTableDataSource<Coche>(ok);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  openDialog(coche: Coche) {
    this.dialog.open(DialogCocheComponent, {
      data: coche
    });
  }

}
