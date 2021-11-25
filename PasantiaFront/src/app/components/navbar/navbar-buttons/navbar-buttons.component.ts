import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';

@Component({
  selector: 'app-navbar-buttons',
  templateUrl: './navbar-buttons.component.html',
  styleUrls: ['./navbar-buttons.component.css']
})
export class NavbarButtonsComponent implements OnInit {

  @Output() cerrarSesionEvent: EventEmitter<any> = new EventEmitter();
  @Input() usuario: undefined;

  constructor(
    public service: TokenStorageService,
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    this.service.logout();
  }

}
