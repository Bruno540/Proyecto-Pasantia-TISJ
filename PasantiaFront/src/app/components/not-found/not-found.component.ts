import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private titleService: Title,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("404")
  }

  back(): void {
    this.location.back()
  }
}
