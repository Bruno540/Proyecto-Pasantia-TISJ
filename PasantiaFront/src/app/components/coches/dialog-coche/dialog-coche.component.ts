import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coche } from 'src/app/models/coche.model';
import { CocheService } from 'src/app/services/coches/coche.service';

@Component({
  selector: 'app-dialog-coche',
  templateUrl: './dialog-coche.component.html',
  styleUrls: ['./dialog-coche.component.sass']
})
export class DialogCocheComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: Coche,
  private CocheService: CocheService) { }

  ngOnInit(): void {
  }

  _delete(id: number) {
    this.CocheService._delete(id).subscribe();
    window.location.reload();
  }

}
