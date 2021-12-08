import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Registro } from 'src/app/models/registro.model';
import { Turno } from 'src/app/models/turno.model';
import { RegistrosService } from 'src/app/services/registros/registros.service';
import { SocketServiceService } from 'src/app/services/socket/socket-service.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { ProyecConfig } from 'src/environments/proyect-config';

@Component({
  selector: 'app-registro-live',
  templateUrl: './registro-live.component.html',
  styleUrls: ['./registro-live.component.sass']
})
export class RegistroLiveComponent implements OnInit {

  backendUrl = ProyecConfig.rutaImagen;
  sseUrl = ProyecConfig.sseUrl;
  imagen?: any;
  displayedColumns: string[] = ['fotoEmpresa', 'empresa', 'origen', 'destino', 'horaTurno', 'estado'];
  dataSource: Turno[] = [];
  searchForm: FormGroup;

  constructor(
    private SocketService: SocketServiceService,
    private zone: NgZone,
    private registroService: RegistrosService,
    private turnoService: TurnosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();

    this.searchForm = this.formBuilder.group({
      hora: [""],
      fecha: [""]
    });
  }

  getDataSource() {
    return this.dataSource;
  }

  init() {
    this.getServerSentEvent(this.sseUrl).subscribe((data: any) => console.log(data))
    this.turnoService.getLive().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });
  }

  getServerSentEvent(url: string) {
    return Observable.create((observer: any) => {
      const eventSource = this.SocketService.getEventSource(url);
      eventSource.onmessage = event => {
        this.dataSource = JSON.parse(event.data);
        console.log("Los regstros son: ", this.dataSource);
        this.zone.run(() => {
          observer.next(event);
        })
      }
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        })
      }
    })
  }

  submit() {
    const { fecha, hora } = this.searchForm.value;
    this.turnoService.getFiltered(fecha, hora).subscribe(
      ok => {
        console.log(ok);
        
        this.dataSource = ok;
      }
    );
  }

  limpiar() {
    this.init();
    this.searchForm.reset();
  }
}
