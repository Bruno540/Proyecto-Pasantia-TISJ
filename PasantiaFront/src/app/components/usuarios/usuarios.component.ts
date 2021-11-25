import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email','nombre','apellido','actions'];
  dataSource: Usuario[] = [];

  constructor(private UsuariosService: UsuariosService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.UsuariosService.getAll().subscribe(
      ok => {
        console.log(ok);
        this.dataSource = ok;
      }
    );
  }

  openDialog(usuario: Usuario) {
    this.dialog.open(DialogUsuarioComponent, {
      data: usuario
    });
  }

}
