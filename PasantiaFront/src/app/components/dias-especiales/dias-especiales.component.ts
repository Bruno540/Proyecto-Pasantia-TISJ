import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { DiasEspeciales } from 'src/app/models/dias-especiales.model';
import { DiasEspecialesService } from 'src/app/services/dias-especiales/dias-especiales.service';

@Component({
  selector: 'app-dias-especiales',
  templateUrl: './dias-especiales.component.html',
  styleUrls: ['./dias-especiales.component.sass']
})
export class DiasEspecialesComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'actions'];
  //dataSource: DiasEspeciales[] = [];
  dataSource: any;

  constructor(
    private DiasEspecialesService: DiasEspecialesService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Dias Especiales");

    this.DiasEspecialesService.getAll().subscribe(
      ok => {
        //this.dataSource = ok;
        this.dataSource = new MatTableDataSource<DiasEspeciales>(ok);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDelete(id: number) {
    this.DiasEspecialesService._delete(id).subscribe();
    window.location.reload();
  }

}
