import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coche } from 'src/app/models/coche.model';
import { CocheService } from 'src/app/services/coches/coche.service';
import { DialogCocheComponent } from './dialog-coche/dialog-coche.component';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrls: ['./coches.component.sass']
})
export class CochesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'numero', 'matricula', 'empresa', 'actions'];
  dataSource: Coche[] = [];

  constructor(private CocheService: CocheService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.CocheService.getAll().subscribe(
      ok => {
        this.dataSource = ok;
      }
    );
  }

  openDialog(coche: Coche) {
    this.dialog.open(DialogCocheComponent, {
      data: coche
    });
  }

}
