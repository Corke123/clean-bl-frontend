import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Report } from '../../../../shared/model/report.model';
import { ReportService } from 'src/app/shared/services/reports.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { MediaObserver } from '@angular/flex-layout';

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
    private sanitizer: DomSanitizer,
    public media: MediaObserver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.reportService.getReportById(+params['id']).subscribe(
        (report: Report) => {
          this.report = report;
        },
        () => {
          this.commonService.showSnackBar('Nije moguće pronaći prijavu!');
          this.router.navigate(['/404'], {
            relativeTo: this.route.parent,
          });
        }
      );
    });
  }

  isCompleted(): boolean {
    return this.report?.status === 'završen';
  }

  showRate(): boolean {
    return this.isCompleted() && this?.report.valid;
  }

  isMobile(): boolean {
    return this.media.isActive('xs');
  }

  transform() {
    if (this.report !== undefined) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/png;base64, ' + this.report.base64Image
      );
    }
  }
}
