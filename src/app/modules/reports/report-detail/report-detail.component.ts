import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Report } from '../report.model';
import { ReportService } from '../report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.report = this.reportService.getReportById(this.id);
      this.reportService.setSelectedReport(this.report);
      if (this.report !== undefined) {
        this.dataStorageService.getCommentsForReport(this.id).subscribe();
      } else {
        this.snackBar.open('Unable to find report!', 'OK', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate([''], {
          relativeTo: this.route.parent,
        });
      }
    });
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/png;base64, ' + this.report.base64Image
    );
  }
}
