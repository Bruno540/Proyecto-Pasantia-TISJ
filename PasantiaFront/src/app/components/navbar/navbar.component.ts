import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() showSidenavEvent = new EventEmitter();
  @Input() mobile: boolean = false;

  constructor(
    public titleService: Title
  ) { }

  ngOnInit(): void {
  }

  showSidenav(): void {
    this.showSidenavEvent.emit();
  }

}
