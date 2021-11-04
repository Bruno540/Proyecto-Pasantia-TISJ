import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { CocheService } from 'src/app/services/coches/coche.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';

@Component({
  selector: 'app-create-coche',
  templateUrl: './create-coche.component.html',
  styleUrls: ['./create-coche.component.sass']
})
export class CreateCocheComponent implements OnInit {

  cocheForm: FormGroup;
  dataSource: Empresa[] = [];

  constructor(private FormBuilder: FormBuilder,
    private CocheService: CocheService,
    private EmpresasService: EmpresasService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmpresas();
    this.cocheForm = this.FormBuilder.group({
      numero: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      empresaId:['', [Validators.required]]
    });

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.CocheService.get(IdFromRoute).subscribe(
        ok => {
          this.cocheForm.addControl("id", new FormControl('', [Validators.required]));

          this.cocheForm.patchValue(ok);
        }
      );
    }
  }

  getEmpresas():void{
    this.EmpresasService.getAll().subscribe(
      ok => {
        this.dataSource = ok;
      }
    );
  }

  submit() {
    if (this.cocheForm.contains("id")) {
      const id = this.cocheForm.controls.id.value;
      this.CocheService.update(id, this.cocheForm.value).subscribe();
    } else {
      this.CocheService.create(this.cocheForm.value).subscribe();
    }
  }

}
