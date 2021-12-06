import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { Usuario } from 'src/app/models/usuario.model';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.sass']
})
export class CreateUsuarioComponent implements OnInit {

  admin: boolean = false;
  usuarioForm: FormGroup;
  dataSource: Empresa[];

  constructor( private FormBuilder: FormBuilder,
    private UsuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private EmpresasService: EmpresasService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Usuario");

    this.getEmpresas();

    this.usuarioForm = this.FormBuilder.group({
      email: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      password: ['', [Validators.required]],
      empresa: ['', [Validators.required]]
    });

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.UsuariosService.get(IdFromRoute).subscribe(
        ok => {
          this.usuarioForm.addControl("id", new FormControl('', [Validators.required]));

          if (ok.empresa && typeof ok.empresa != "number") {
            ok.empresa = ok.empresa.id;
          }

          if (ok.rol.nombre == "Administrador") {
            this.admin = true;
            this.usuarioForm.removeControl("empresa");
          }

          this.usuarioForm.patchValue(ok);
        }
      );
    }
  }

  getEmpresas(): void {
    this.EmpresasService.getAll().subscribe(
      ok => {
        this.dataSource = ok;
      }
    );
  }

  submit() {
    if (this.usuarioForm.contains("id")) {
      const id = this.usuarioForm.controls.id.value;
      this.UsuariosService.update(id, this.usuarioForm.value).subscribe();
    } else {
      this.UsuariosService.create(this.usuarioForm.value).subscribe();
    }
  }
}


