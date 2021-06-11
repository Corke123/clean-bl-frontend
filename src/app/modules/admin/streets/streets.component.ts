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
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { PartOfTheCity } from 'src/app/shared/model/part-of-the-city.model';
import { Street } from 'src/app/shared/model/street.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { PartOfTheCityService } from 'src/app/shared/services/part-of-the-city.service';
import { StreetService } from 'src/app/shared/services/street.service';
import { AddEditStreetDialogComponent } from './add-edit-street-dialog/add-edit-street-dialog.component';

@Component({
  selector: 'app-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.css'],
})
export class StreetsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'partOfTheCity', 'actions'];
  dataSource: Observable<Street[]>;
  partsOfTheCity: PartOfTheCity[];

  isLoading = false;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  totalElements = 0;
  page: any;
  oldSearchString = '';
  searchString = new BehaviorSubject<string>('');
  partOfTheCity = new BehaviorSubject<string>('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private partOfTheCityService: PartOfTheCityService,
    private streetService: StreetService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.dataSource = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchString,
      this.partOfTheCity
    ).pipe(
      startWith({}),
      debounceTime(300),
      switchMap(() => {
        return this.streetService.getStreets(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.searchString.getValue(),
          this.partOfTheCity.getValue()
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

  ngOnInit(): void {
    this.partOfTheCityService.getPartsOfTheCitySimple().subscribe(
      (partsOfTheCity) => {
        this.partsOfTheCity = partsOfTheCity;
      },
      (err) => {
        this.commonService.showSnackBar(
          'Došlo je do greške. Nije moguće dobiti informacije o naseljima!'
        );
      }
    );
  }

  addStreet(): void {
    const dialogRef = this.dialog.open(AddEditStreetDialogComponent, {
      width: '400px',
      data: {
        action: 'ADD',
        partsOfTheCity: this.partsOfTheCity,
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

  setPartOfTheCity(event: any): void {
    this.partOfTheCity.next(event.value);
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  setPage(page: any): void {
    this.isLoading = false;
    this.page = page;
    this.totalElements = page.totalElements;
  }

  editStreet(street: Street) {
    const dialogRef = this.dialog.open(AddEditStreetDialogComponent, {
      width: '400px',
      data: {
        action: 'UPDATE',
        street: street,
        partsOfTheCity: this.partsOfTheCity,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.searchString.next(this.oldSearchString);
    });
  }

  deleteStreet(street: Street) {
    this.streetService.deleteStreet(street.id).subscribe(
      () => {
        this.commonService.showSnackBar('Ulica je uspješno obrisana!');
        this.searchString.next(this.oldSearchString);
      },
      () => {
        this.commonService.showSnackBar('Nije moguće obrisati ulicu!');
      }
    );
  }

  handleError(): void {
    this.isLoading = false;
    this.commonService.showSnackBar(
      'Greška, nije moguće dobiti informacije o ulicama!'
    );
  }

  openConfirmDialog(street: Street): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Obriši ulicu',
        question: 'Da li ste sigurni da želite obrisati ulicu ' + street.name,
      },
    });

    dialogRef.afterClosed().subscribe((dialogAction) => {
      if (dialogAction === 'confirm') {
        this.deleteStreet(street);
      }
    });
  }
}
