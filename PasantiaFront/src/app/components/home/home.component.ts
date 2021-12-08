import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private titleService: Title,
    public tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Bienvenido")
  }

}
