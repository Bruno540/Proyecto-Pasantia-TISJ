import { Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Registro } from 'src/app/models/registro.model';
import { SocketServiceService } from 'src/app/services/socket/socket-service.service';

@Component({
  selector: 'app-registro-live',
  templateUrl: './registro-live.component.html',
  styleUrls: ['./registro-live.component.sass']
})
export class RegistroLiveComponent implements OnInit {

  displayedColumns: string[] = ['id', 'observaciones', 'toqueAnden', 'cocheNro','matricula','empresa', 'actions'];
  dataSource: Registro[] = [];
  constructor(private SocketService: SocketServiceService, private zone: NgZone) { }

  ngOnInit(): void {
    this.getServerSentEvent('http://localhost:3000/sse').subscribe((data:any)=> console.log(data))
  }
  
  getServerSentEvent(url:string){
    return Observable.create((observer: any) =>{
      const eventSource = this.SocketService.getEventSource(url);
      eventSource.onmessage = event =>{
        console.log("EL EVNETO ES: ", JSON.parse(event.data));
        this.zone.run(()=>{
          observer.next(event);
        })
      }
      eventSource.onerror = error =>{
        this.zone.run(()=>{
          observer.error(error);
        })
      }
    })
  }
}
