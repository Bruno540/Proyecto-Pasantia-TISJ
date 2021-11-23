import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Coche } from 'src/app/models/coche.model';
import { Turno } from 'src/app/models/turno.model';
import { CocheService } from 'src/app/services/coches/coche.service';
import { RegistrosService } from 'src/app/services/registros/registros.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';

@Component({
  selector: 'app-create-registro',
  templateUrl: './create-registro.component.html',
  styleUrls: ['./create-registro.component.sass']
})
export class CreateRegistroComponent implements OnInit {

  registrosForm: FormGroup;
  coches: any;
  turnos: Turno[]=[];

  constructor(private FormBuilder: FormBuilder,
    private RegistroService: RegistrosService,
    private CocheService: CocheService,
    private TurnoService: TurnosService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getCoches();
    this.getTurnos();
    this.registrosForm = this.FormBuilder.group({
      turnoId:['', [Validators.required]],
      cocheId:['', [Validators.required]],
      observaciones:['']
    })

    const routeParams = this.route.snapshot.paramMap;
    const IdFromRoute = Number(routeParams.get('id'));

    if (IdFromRoute) {
      this.RegistroService.get(IdFromRoute).subscribe(
        ok => {
          this.registrosForm.addControl("id", new FormControl('', [Validators.required]));

          this.registrosForm.patchValue(ok);
        }
      );
    }
  }

  getCoches():void{
    this.CocheService.getAll().subscribe(data=>{
      this.coches=data;
    })
  }

  getTurnos():void{
    this.TurnoService.getAll().subscribe(data=>{
      console.log(data);
      this.turnos = data[0]
    })
  }

  submit() {
    if (this.registrosForm.contains("id")) {
      const id = this.registrosForm.controls.id.value;
      this.RegistroService.update(id, this.registrosForm.value).subscribe(data=>{
        this.snackBar.open("Registro actualizado exitosamente", "Cerrar");
        this.router.navigateByUrl("/registros");
    },err=>{
      this.snackBar.open(err.error.message, "Cerrar")
    });
    } else {
      this.RegistroService.create(this.registrosForm.value).subscribe(data=>{
        this.snackBar.open("Registro actualizado exitosamente", "Cerrar");
        this.router.navigateByUrl("/registros");
    },err=>{
      this.snackBar.open(err.error.message, "Cerrar")
    });
    }
  }

  busqueda(event: any): void{
    this.getCochesBusqueda(event.target.value);
  }

  getCochesBusqueda(filter: string): void{
    if(filter===''){
      this.getCoches();
    }else{
      this.CocheService.getCochesBusqueda(filter).subscribe(data=>{
        this.coches = data;
      });
    }
  }

}
