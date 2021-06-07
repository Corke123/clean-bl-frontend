import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Report } from '../../../shared/model/report.model';
import { ReportService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
})
export class ReportDetailComponent implements OnInit {
  report: Report;
  id: number;

  constructor(
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.reportService.getReportById(+params['id']).subscribe(
        (report: Report) => {
          this.report = report;
        },
        () => {
          this.snackBar.open('Nije moguće pronaći prijavu!', 'OK', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate([''], {
            relativeTo: this.route.parent,
          });
        }
      );
    });
  }

  transform() {
    if (this.report !== undefined) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/png;base64, ' + this.report.base64Image
      );
    }
  }
}
