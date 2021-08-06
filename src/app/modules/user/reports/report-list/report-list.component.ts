import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, merge, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { ReportStatus } from 'src/app/shared/model/report-status.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ReportStatusService } from 'src/app/shared/services/report-status.service';
import { ReportService } from 'src/app/shared/services/reports.service';
import { Report } from '../../../../shared/model/report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit, AfterViewInit {
  reports: Report[] = [];
  statuses: ReportStatus[];
  totalElements: number;
  sortLabel = 'Najnovije';
  sortBy = 'createdAt';
  sortOrder = new BehaviorSubject<string>('DESC');
  title = new BehaviorSubject<string>('');
  user = new BehaviorSubject<string>('');
  activeFilters = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSelect) statusSelect: MatSelect;

  constructor(
    private reportService: ReportService,
    private reportStatusService: ReportStatusService,
    private commonService: CommonService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.reportStatusService.getReportStatuses().subscribe(
      (statuses: ReportStatus[]) => {
        this.statuses = statuses;
      },
      () => {
        this.commonService.showSnackBar(
          'Došlo je do greške, nije moguće dobiti informacije o statusima'
        );
      }
    );
  }

  ngAfterViewInit(): void {
    merge(
      this.paginator.page,
      this.sortOrder,
      this.statusSelect.selectionChange,
      this.title,
      this.user
    )
      .pipe(
        startWith({}),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          return this.reportService.getReports({
            pageNumber: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            sortBy: this.sortBy,
            sortDirection: this.sortOrder.getValue(),
            status: this.statusSelect.value || '',
            title: this.title.getValue(),
            username: this.user.getValue(),
          });
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

  onSort(ascending: boolean): void {
    this.resetPaging();
    if (ascending) {
      this.sortLabel = 'Najstarije';
      this.sortOrder.next('ASC');
    } else {
      this.sortLabel = 'Najnovije';
      this.sortOrder.next('DESC');
    }
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  onTitleChanged(input: string) {
    this.resetPaging();
    this.title.next(input);
  }

  onUserChanged(input: string) {
    this.resetPaging();
    this.user.next(input);
  }
}
