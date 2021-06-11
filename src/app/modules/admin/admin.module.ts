import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { StreetsComponent } from './streets/streets.component';
import { AddEditStreetDialogComponent } from './streets/add-edit-street-dialog/add-edit-street-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartsOfTheCityComponent } from './parts-of-the-city/parts-of-the-city.component';
import { AddEditPartOfTheCityComponent } from './parts-of-the-city/add-edit-part-of-the-city/add-edit-part-of-the-city.component';

@NgModule({
  declarations: [
    StreetsComponent,
    AddEditStreetDialogComponent,
    PartsOfTheCityComponent,
    AddEditPartOfTheCityComponent,
  ],
  imports: [CoreModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class AdminModule {}
