import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../report.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  reports: Report[] = [];

  /** I need report array in this component */

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.subscription = this.reportService.reportsChanged.subscribe((reports: Report[]) => {
      this.reports = reports;
    });
    this.reports = this.reportService.getReports();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
