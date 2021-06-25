import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DepartmentOfficer } from 'src/app/shared/model/department-officer.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { DepartmentOfficerService } from 'src/app/shared/services/department-officer.service';
import { AddEditDepartmentOfficerComponent } from './add-edit-department-officer/add-edit-department-officer.component';

@Component({
  selector: 'app-department-officers',
  templateUrl: './department-officers.component.html',
  styleUrls: ['./department-officers.component.css'],
})
export class DepartmentOfficersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'email', 'department', 'actions'];
  dataSource = new MatTableDataSource<DepartmentOfficer>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private departmentOfficerService: DepartmentOfficerService,
    private commonService: CommonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.departmentOfficerService.getDepartmentOfficers().subscribe(
      (departmentOfficers) => {
        this.dataSource.data = departmentOfficers;
      },
      (err) => {
        this.commonService.showSnackBar(
          'Nije moguće dobiti informacije o službenicima odjeljenja!'
        );
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filterDepartmentOfficers(searchString: string): void {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }

  addDepartmentOfficer(): void {
    const dialogRef = this.dialog.open(AddEditDepartmentOfficerComponent, {
      width: '400px',
      data: {
        action: 'ADD',
      },
    });
    dialogRef.afterClosed().subscribe((createdDepartmentOfficer) => {
      if (createdDepartmentOfficer) {
        this.dataSource.data = [
          ...this.dataSource.data,
          createdDepartmentOfficer,
        ];
      }
    });
  }

  editDepartmentOfficer(departmentOfficer: DepartmentOfficer) {
    const dialogRef = this.dialog.open(AddEditDepartmentOfficerComponent, {
      width: '400px',
      data: {
        action: 'UPDATE',
        departmentOfficer: departmentOfficer,
      },
    });
    dialogRef.afterClosed().subscribe((updatedDepartmentOfficer) => {
      if (updatedDepartmentOfficer) {
        this.updateDepartmentOfficerInDataSource(updatedDepartmentOfficer);
      }
    });
  }

  openConfirmDialog(departmentOfficer: DepartmentOfficer): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Obriši službenika odjeljenja',
        question:
          'Da li ste sigurni da želite obrisati službenika odjeljenja ' +
          departmentOfficer.firstName +
          ' ' +
          departmentOfficer.lastName,
      },
    });

    dialogRef.afterClosed().subscribe((dialogAction) => {
      if (dialogAction === 'confirm') {
        this.deleteDepartmentOfficer(departmentOfficer);
      }
    });
  }

  deleteDepartmentOfficer(departmentOfficer: DepartmentOfficer): void {
    this.departmentOfficerService
      .deleteDepartmentOfficer(departmentOfficer.id)
      .subscribe(
        () => {
          this.deleteDepartmentOfficerFromDataSource(departmentOfficer);
          this.commonService.showSnackBar(
            'Službenik odjeljenja je uspješno obrisan!'
          );
        },
        () => {
          this.commonService.showSnackBar(
            'Nije moguće obrisati službenika odjeljenja!'
          );
        }
      );
  }

  deleteDepartmentOfficerFromDataSource(
    deparmentOfficer: DepartmentOfficer
  ): void {
    this.dataSource.data = this.dataSource.data.filter(
      (row) => deparmentOfficer.id !== row.id
    );
  }

  updateDepartmentOfficerInDataSource(deparmentOfficer: DepartmentOfficer) {
    const index = this.dataSource.data.findIndex(
      (d) => d.id === deparmentOfficer.id
    );
    this.dataSource.data[index] = deparmentOfficer;
    this.dataSource.data = [...this.dataSource.data];
  }
}
