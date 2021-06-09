import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PartOfTheCity } from 'src/app/shared/model/part-of-the-city.model';
import { Street } from 'src/app/shared/model/street.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { StreetService } from 'src/app/shared/services/street.service';

@Component({
  selector: 'app-add-edit-street-dialog',
  templateUrl: './add-edit-street-dialog.component.html',
  styleUrls: ['./add-edit-street-dialog.component.css'],
})
export class AddEditStreetDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  newStreet: { name: string; partOfTheCity: string } = {
    name: '',
    partOfTheCity: '',
  };

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditStreetDialogComponent>,
    private streetService: StreetService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      action: string;
      street: Street;
      partsOfTheCity: PartOfTheCity[];
    }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.newStreet.name, Validators.required],
      partOfTheCity: [this.newStreet.partOfTheCity, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      if (this.data.action === 'ADD') {
        this.streetService
          .addStreet(this.form.value)
          .pipe(
            catchError(this.handleError),
            tap((street) => {
              this.handleSuccess();
            })
          )
          .subscribe();
      } else {
        this.streetService
          .updateStreet(this.data.street.id, this.form.value)
          .pipe(
            catchError(this.handleError),
            tap((street) => {
              this.handleSuccess();
            })
          )
          .subscribe();
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  handleSuccess(): void {
    this.commonService.showSnackBar('Izmjene su uspješno sačuvane!');
    this.close();
  }

  handleError(err) {
    this.commonService.showSnackBar(
      'Došlo je do greške. Provjerite da li ste unijeli validne podatke!'
    );
    return throwError(err);
  }

  comparePartOfTheCity(p1: any, p2: any): boolean {
    return p1 === p2.name;
  }
}
