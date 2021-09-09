import { Component, Input, OnInit } from '@angular/core';
import { DepartmentServiceService } from 'src/app/shared/services/department-service.service';
import * as Highcharts from 'highcharts';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';

HC_exporting(Highcharts);
HC_exportData(Highcharts);

@Component({
  selector: 'app-department-review',
  templateUrl: './department-review.component.html',
  styleUrls: ['./department-review.component.css'],
})
export class DepartmentReviewComponent implements OnInit {
  selectedYear = new Date().getFullYear();
  selectedDepartment = '';
  years: number[] = [];
  departments: string[] = [];

  chart;
  updateFlag = false;
  Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartCallback;
  chartOptions;

  constructor(
    private departmentServiceService: DepartmentServiceService,
    private statisticsService: StatisticsService
  ) {
    const self = this;

    this.chartCallback = (chart) => {
      self.chart = chart;
    };

    for (let i = 0; i < 3; i++) {
      this.years[i] = this.selectedYear - i;
    }
  }

  ngOnInit() {
    this.departmentServiceService
      .getDepartmentServicesNames()
      .subscribe((data) => {
        this.selectedDepartment = data[0];
        this.departments = data;
      });

    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text:
          'Prosječna ocjena ' +
          this.selectedDepartment +
          '-a po mjesecima za ' +
          this.selectedYear +
          '. godinu',
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
          text: 'Ocjena',
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

    this.statisticsService
      .getAverageGrade(this.selectedYear, this.selectedDepartment)
      .subscribe((data) => {
        chart.hideLoading();
        self.chartOptions.series = data;
        self.chartOptions.title = {
          text:
            'Prosječna ocjena ' +
            this.selectedDepartment +
            '-a po mjesecima za ' +
            this.selectedYear +
            '. godinu',
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
