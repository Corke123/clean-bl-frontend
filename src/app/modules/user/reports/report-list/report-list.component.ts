import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
import { ReportService } from 'src/app/shared/services/reports.service';
import { Report } from '../../../../shared/model/report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit, AfterViewInit {
  reports: Report[] = [];
  totalElements: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private reportService: ReportService,
    private commonService: CommonService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.reportService.getReports(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((page) => {
          this.totalElements = page.totalElements;
          return page.content;
        }),
        catchError(() => {
          this.handleError();
          return of([]);
        })
      )
      .subscribe((reports) => (this.reports = reports));
    this.changeDetection.detectChanges();
  }

  handleError(): void {
    this.commonService.showSnackBar(
      'Greška, nije moguće dobiti informacije o prijavama!'
    );
  }
}
