import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() showSidenavEvent = new EventEmitter();
  @Input() mobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showSidenav(): void {
    this.showSidenavEvent.emit();
  }

}
