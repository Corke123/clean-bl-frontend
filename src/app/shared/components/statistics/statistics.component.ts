import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  selectedYear = new Date().getFullYear();
  years: number[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.years[i] = this.selectedYear - i;
    }
  }
}
