import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Report } from 'src/app/shared/model/report.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ReportService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.css'],
})
export class ManageReportsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'createdAt',
    'description',
    'user',
    'status',
    'action',
  ];
  dataSource: Observable<Report[]>;

  pageSizeOptions: number[] = [5, 10, 15, 25];
  totalElements = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private reportService: ReportService,
    private commonService: CommonService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource = merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      debounceTime(300),
      switchMap(() => {
        return this.reportService.getReportsForDepartmentOfficer(
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
    );
    this.changeDetection.detectChanges();
  }

  searchByUser(searchString: string): void {}

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  handleError(): void {
    this.commonService.showSnackBar(
      'Greška, nije moguće dobiti informacije o prijavama!'
    );
  }
}
