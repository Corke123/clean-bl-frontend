import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { PartOfTheCity } from 'src/app/shared/model/part-of-the-city.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { PartOfTheCityService } from 'src/app/shared/services/part-of-the-city.service';
import { AddEditPartOfTheCityComponent } from './add-edit-part-of-the-city/add-edit-part-of-the-city.component';

@Component({
  selector: 'app-parts-of-the-city',
  templateUrl: './parts-of-the-city.component.html',
  styleUrls: ['./parts-of-the-city.component.css'],
})
export class PartsOfTheCityComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: Observable<PartOfTheCity[]>;

  isLoading = false;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  totalElements = 0;
  page: any;
  oldSearchString = '';
  searchString = new BehaviorSubject<string>('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private partOfTheCityService: PartOfTheCityService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.dataSource = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchString
    ).pipe(
      startWith({}),
      debounceTime(300),
      switchMap(() => {
        return this.partOfTheCityService.getPartsOfTheCityPageable(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.searchString.getValue()
        );
      }),
      map((page) => {
        this.setPage(page);
        return page.content;
      }),
      catchError(() => {
        this.handleError();
        return of([]);
      })
    );
    this.changeDetection.detectChanges();
  }

  ngOnInit(): void {}

  addPartOfTheCity(): void {
    const dialogRef = this.dialog.open(AddEditPartOfTheCityComponent, {
      width: '400px',
      data: {
        action: 'ADD',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.searchString.next(this.oldSearchString);
    });
  }

  searchByName(searchString: string): void {
    this.resetPaging();
    this.oldSearchString = searchString;
    this.searchString.next(searchString);
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  setPage(page: any): void {
    this.isLoading = false;
    this.page = page;
    this.totalElements = page.totalElements;
  }

  editPartOfTheCity(partOfTheCity: PartOfTheCity) {
    const dialogRef = this.dialog.open(AddEditPartOfTheCityComponent, {
      width: '400px',
      data: {
        action: 'UPDATE',
        partOfTheCity: partOfTheCity,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.searchString.next(this.oldSearchString);
    });
  }

  deletePartOfTheCity(partOfTheCity: PartOfTheCity) {
    this.partOfTheCityService.deletePartOfTheCity(partOfTheCity.id).subscribe(
      () => {
        this.commonService.showSnackBar('Naselje je uspješno obrisano!');
        this.searchString.next(this.oldSearchString);
      },
      () => {
        this.commonService.showSnackBar('Nije moguće obrisati naselje!');
      }
    );
  }

  handleError(): void {
    this.isLoading = false;
    this.commonService.showSnackBar(
      'Greška, nije moguće dobiti informacije o naseljima!'
    );
  }

  openConfirmDialog(partOfTheCity: PartOfTheCity): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Obriši naselje',
        question:
          'Da li ste sigurni da želite obrisati naselje ' + partOfTheCity.name,
      },
    });

    dialogRef.afterClosed().subscribe((dialogAction) => {
      if (dialogAction === 'confirm') {
        this.deletePartOfTheCity(partOfTheCity);
      }
    });
  }
}
