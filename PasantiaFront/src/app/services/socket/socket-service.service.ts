import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  constructor() { 
  }

  getEventSource(url: string): EventSource{
    return new EventSource(url);
  }
}
