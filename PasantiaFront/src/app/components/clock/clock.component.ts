import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.sass']
})
export class ClockComponent implements OnInit {
  date: Date;

  constructor() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    
  }
}
