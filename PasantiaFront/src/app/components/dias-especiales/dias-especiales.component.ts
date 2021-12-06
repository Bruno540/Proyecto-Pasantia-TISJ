import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DiasEspeciales } from 'src/app/models/dias-especiales.model';
import { DiasEspecialesService } from 'src/app/services/dias-especiales/dias-especiales.service';

@Component({
  selector: 'app-dias-especiales',
  templateUrl: './dias-especiales.component.html',
  styleUrls: ['./dias-especiales.component.sass']
})
export class DiasEspecialesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'actions'];
  dataSource: DiasEspeciales[] = [];

  constructor(
    private DiasEspecialesService: DiasEspecialesService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Dias Especiales");

    this.DiasEspecialesService.getAll().subscribe(
      ok => {
        this.dataSource = ok;
      }
    );
  }

  onDelete(id: number) {
    this.DiasEspecialesService._delete(id).subscribe();
    window.location.reload();
  }

}
