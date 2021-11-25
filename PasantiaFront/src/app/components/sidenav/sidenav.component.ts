import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';
import { IsMobileService } from 'src/app/services/is-mobile/is-mobile.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobile: boolean = false;

  constructor(
    public isMobile: IsMobileService,
    public tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    
  }

}
