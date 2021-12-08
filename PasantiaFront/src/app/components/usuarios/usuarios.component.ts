import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  displayedColumns: string[] = ['id', 'email', 'nombre', 'apellido', 'rol', 'empresa', 'actions'];
  //dataSource: Usuario[] = [];
  dataSource: any;

  constructor(private UsuariosService: UsuariosService,
    public dialog: MatDialog,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Usuarios");
    this.UsuariosService.getAll().subscribe(
      ok => {
        //this.dataSource = ok;
        this.dataSource = new MatTableDataSource<Usuario>(ok);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  openDialog(usuario: Usuario) {
    this.dialog.open(DialogUsuarioComponent, {
      data: usuario
    });
  }

}
