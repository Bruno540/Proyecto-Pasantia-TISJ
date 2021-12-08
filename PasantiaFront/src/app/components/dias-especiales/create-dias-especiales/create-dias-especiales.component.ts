import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DiasEspecialesService } from 'src/app/services/dias-especiales/dias-especiales.service';

@Component({
  selector: 'app-create-dias-especiales',
  templateUrl: './create-dias-especiales.component.html',
  styleUrls: ['./create-dias-especiales.component.sass']
})
export class CreateDiasEspecialesComponent implements OnInit {

  diaForm: FormGroup;

  constructor(private FormBuilder: FormBuilder,
    private DiasEspecialesService: DiasEspecialesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.diaForm = this.FormBuilder.group({
      nombre: [''],
      fecha: ['', [Validators.required]]
    });
  }

  submit() {

    let data = this.diaForm.value;
    data.fecha = data.fecha.format("YYYY-MM-DD");


    this.DiasEspecialesService.create(data).subscribe(data => {
      this.snackBar.open("Dia especial creado exitosamente", "Cerrar");
      this.router.navigateByUrl("/dias-especiales");
    }, err => {
      this.snackBar.open(err.error.message, "Cerrar")
    });
  }

}
