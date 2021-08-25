import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';

HC_exporting(Highcharts);
HC_exportData(Highcharts);

@Component({
  selector: 'app-monthly-review',
  templateUrl: './monthly-review.component.html',
  styleUrls: ['./monthly-review.component.css'],
})
export class MonthlyReviewComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() year: number;

  chart;
  updateFlag = false;
  Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartCallback;
  chartOptions;

  constructor(private statisticsService: StatisticsService) {
    const self = this;

    this.chartCallback = (chart) => {
      self.chart = chart;
    };
  }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Broj prijava po mjesecima za ' + this.year + '. godinu',
      },
      exporting: {
        enabled: true,
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
      series: [],
    };
  }

  ngAfterViewInit() {
    this.updateChart();
  }

  updateChart() {
    setTimeout(() => {
      if (this.chart) {
        this.chart.reflow();
      }
    }, 100);
    const self = this;
    const chart = this.chart;

    chart.showLoading();

    this.statisticsService.getMonthlyStatistics(this.year).subscribe((data) => {
      chart.hideLoading();
      self.chartOptions.series = data;
      self.chartOptions.title = {
        text: 'Broj prijava po mjesecima za ' + this.year + '. godinu',
      };

      self.updateFlag = true;
    });
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }
}
