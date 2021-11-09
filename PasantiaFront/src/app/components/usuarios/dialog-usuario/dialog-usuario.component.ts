import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.sass']
})
export class DialogUsuarioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Usuario,
  private UsuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  _delete(id: string) {
    this.UsuariosService._delete(id).subscribe();
    window.location.reload();
  }

}
