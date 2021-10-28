import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.sass']
})
export class CreateUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor( private FormBuilder: FormBuilder,
    private UsuariosService: UsuariosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuarioForm = this.FormBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
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

  submit() {
    if (this.usuarioForm.contains("id")) {
      const id = this.usuarioForm.controls.id.value;
      this.UsuariosService.update(id, this.usuarioForm.value).subscribe();
    } else {
      this.UsuariosService.create(this.usuarioForm.value).subscribe();
    }
  }
}


