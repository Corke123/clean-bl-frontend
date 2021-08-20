import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-monthly-review',
  templateUrl: './monthly-review.component.html',
  styleUrls: ['./monthly-review.component.css'],
})
export class MonthlyReviewComponent implements OnInit {
  @Input() year: number;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Broj prijava po mjesecima za ' + this.year + '. godinu',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Maj',
          'Jun',
          'Jul',
          'Avg',
          'Sep',
          'Okt',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Broj prijava',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Poslane',
          type: 'column',
          data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
        },
        {
          name: 'U procesu',
          type: 'column',
          data: [83, 78, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92],
        },
        {
          name: 'Završene',
          type: 'column',
          data: [48, 38, 39, 41, 47, 48, 59, 59, 52, 65, 59, 10],
        },
        // {
        //   name: 'Berlin',
        //   type: 'column',
        //   data: [
        //     42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
        //     51.1,
        //   ],
        // },
      ],
    };
  }
}
