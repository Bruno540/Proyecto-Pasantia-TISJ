import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { ProyecConfig } from 'src/environments/proyect-config';

@Component({
  selector: 'app-create-empresa',
  templateUrl: './create-empresa.component.html',
  styleUrls: ['./create-empresa.component.sass']
})
export class CreateEmpresaComponent implements OnInit {

  empresaForm: FormGroup;
  currentFile!: File;
  backendUrl = ProyecConfig.rutaImagen;
  imagen?: any;

  constructor(
    private FormBuilder: FormBuilder,
    private EmpresasService: EmpresasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.empresaForm = this.FormBuilder.group({
      rut: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
    });

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.EmpresasService.get(IdFromRoute).subscribe(
        ok => {
          this.empresaForm.addControl("id", new FormControl('', [Validators.required]));

          this.empresaForm.patchValue(ok);
          this.imagen = ok.imagen
        }
      );
    }
  }

  submit() {
    if (this.empresaForm.contains("id")) {
      const id = this.empresaForm.controls.id.value;
      this.EmpresasService.update(id, this.empresaForm.value, this.currentFile).subscribe();
    } else {
      this.EmpresasService.create(this.empresaForm.value, this.currentFile).subscribe();
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.currentFile = event.target.files[0];
    }
  }

}
