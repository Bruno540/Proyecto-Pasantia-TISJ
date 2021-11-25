import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.sass']
})
export class CreateUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  dataSource: Empresa[] = [];

  constructor(
    private FormBuilder: FormBuilder,
    private UsuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private EmpresasService: EmpresasService,
  ) { }

  ngOnInit(): void {
    this.getEmpresas();

    this.usuarioForm = this.FormBuilder.group({
      email: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      password: ['', [Validators.required]],
      empresa:['', [Validators.required]]
    });

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.UsuariosService.get(IdFromRoute).subscribe(
        ok => {
          this.usuarioForm.addControl("id", new FormControl('', [Validators.required]));

          this.usuarioForm.patchValue(ok);
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
    if (this.usuarioForm.contains("id")) {
      const id = this.usuarioForm.controls.id.value;
      this.UsuariosService.update(id, this.usuarioForm.value).subscribe(
        ok => {
          this.snackBar.open("Usuario actualizado exitosamente", "Cerrar");
          this.router.navigateByUrl("/usuarios");
        },
        err => this.snackBar.open(err.error.message, "Cerrar")
      );
    } else {
      this.UsuariosService.create(this.usuarioForm.value).subscribe(
        ok => {
          this.snackBar.open("Usuario creado exitosamente", "Cerrar");
          this.router.navigateByUrl("/usuarios");
        },
        err => this.snackBar.open(err.error.message, "Cerrar")
      );
    }
  }
}


