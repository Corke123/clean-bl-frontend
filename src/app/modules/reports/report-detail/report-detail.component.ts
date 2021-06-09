import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Report } from '../../../shared/model/report.model';
import { ReportService } from 'src/app/shared/services/reports.service';
import { CommonService } from 'src/app/shared/services/common.service';

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
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.reportService.getReportById(+params['id']).subscribe(
        (report: Report) => {
          this.report = report;
        },
        () => {
          this.commonService.showSnackBar('Nije moguće pronaći prijavu!');
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
