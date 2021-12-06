import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'nombre', 'apellido', 'rol', 'empresa', 'actions'];
  dataSource: Usuario[] = [];

  constructor(private UsuariosService: UsuariosService,
    public dialog: MatDialog,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Usuarios");
    this.UsuariosService.getAll().subscribe(
      ok => {
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
