import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private readonly sanitizer: DomSanitizer
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
          this.imagen = this.backendUrl + ok.imagen
        }
      );
    }
  }

  submit() {
    if (this.empresaForm.contains("id")) {
      const id = this.empresaForm.controls.id.value;
      this.EmpresasService.update(id, this.empresaForm.value, this.currentFile).subscribe(
        ok => {
          this.snackBar.open("Empresa actualizada exitosamente", "Cerrar");
          this.router.navigateByUrl("/empresas");
        },
        err => this.snackBar.open(err.error.message, "Cerrar")
      );
    } else {
      this.EmpresasService.create(this.empresaForm.value, this.currentFile).subscribe(
        ok => {
          this.snackBar.open("Empresa creada exitosamente", "Cerrar");
          this.router.navigateByUrl("/empresas");
        },
        err => this.snackBar.open(err.error.message, "Cerrar")
      );
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.currentFile = event.target.files[0];
      this.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.currentFile));
    }
  }

}
