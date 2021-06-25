import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DepartmentOfficer } from 'src/app/shared/model/department-officer.model';
import { Department } from 'src/app/shared/model/department.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { DepartmentOfficerService } from 'src/app/shared/services/department-officer.service';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-add-edit-department-officer',
  templateUrl: './add-edit-department-officer.component.html',
  styleUrls: ['./add-edit-department-officer.component.css'],
})
export class AddEditDepartmentOfficerComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  newDepartmentOfficer: DepartmentOfficer = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    department: '',
  };
  departments: Department[];

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditDepartmentOfficerComponent>,
    private departmentOfficerService: DepartmentOfficerService,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      action: string;
      departmentOfficer: DepartmentOfficer;
    }
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
    this.form = this.formBuilder.group({
      firstName: [this.newDepartmentOfficer.firstName, Validators.required],
      lastName: [this.newDepartmentOfficer.firstName, Validators.required],
      username: [this.newDepartmentOfficer.firstName, Validators.required],
      email: [
        this.newDepartmentOfficer.firstName,
        Validators.compose([Validators.required, Validators.email]),
      ],
      department: [this.newDepartmentOfficer.firstName, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      if (this.data.action === 'ADD') {
        this.departmentOfficerService
          .addDepartmentOfficer(this.form.value)
          .pipe(
            catchError(this.handleError),
            tap((departmentOfficer) => {
              this.handleSuccess(departmentOfficer);
            })
          )
          .subscribe();
      } else {
        this.departmentOfficerService
          .updateDepartmentOfficer(
            this.data.departmentOfficer.id,
            this.form.value
          )
          .pipe(
            catchError(this.handleError),
            tap((departmentOfficer) => {
              this.handleSuccess(departmentOfficer);
            })
          )
          .subscribe();
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  handleSuccess(departmentOfficer: DepartmentOfficer): void {
    this.commonService.showSnackBar('Izmjene su uspješno sačuvane!');
    this.dialogRef.close(departmentOfficer);
  }

  handleError(err) {
    this.commonService.showSnackBar(
      'Došlo je do greške. Provjerite da li ste unijeli validne podatke!'
    );
    return throwError(err);
  }

  compareDepartments(d1: any, d2: any): boolean {
    return d1 === d2;
  }
}
