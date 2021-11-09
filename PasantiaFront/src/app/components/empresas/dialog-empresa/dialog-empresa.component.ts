import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';

@Component({
  selector: 'app-dialog-empresa',
  templateUrl: './dialog-empresa.component.html',
  styleUrls: ['./dialog-empresa.component.sass']
})
export class DialogEmpresaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Empresa,
    private EmpresasService: EmpresasService
  ) { }

  ngOnInit(): void {
  }

  _delete(id: string) {
    this.EmpresasService._delete(id).subscribe();
    window.location.reload();
  }

}
