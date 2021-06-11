import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PartOfTheCity } from 'src/app/shared/model/part-of-the-city.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { PartOfTheCityService } from 'src/app/shared/services/part-of-the-city.service';

@Component({
  selector: 'app-add-edit-part-of-the-city',
  templateUrl: './add-edit-part-of-the-city.component.html',
  styleUrls: ['./add-edit-part-of-the-city.component.css'],
})
export class AddEditPartOfTheCityComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  newStreet: { name: string } = {
    name: '',
  };

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditPartOfTheCityComponent>,
    private partOfTheCityService: PartOfTheCityService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      action: string;
      partOfTheCity: PartOfTheCity;
    }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.newStreet.name, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      if (this.data.action === 'ADD') {
        this.partOfTheCityService
          .addPartOfThecity(this.form.value)
          .pipe(
            catchError(this.handleError),
            tap((partOfTheCity) => {
              this.handleSuccess();
            })
          )
          .subscribe();
      } else {
        this.partOfTheCityService
          .updatePartOfTheCity(this.data.partOfTheCity.id, this.form.value)
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
    return p1 === p2;
  }
}
