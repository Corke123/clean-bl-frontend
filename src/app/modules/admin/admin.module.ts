import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { StreetsComponent } from './streets/streets.component';
import { AddEditStreetDialogComponent } from './streets/add-edit-street-dialog/add-edit-street-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartsOfTheCityComponent } from './parts-of-the-city/parts-of-the-city.component';
import { AddEditPartOfTheCityComponent } from './parts-of-the-city/add-edit-part-of-the-city/add-edit-part-of-the-city.component';
import { MessagesComponent } from './messages/messages.component';
import { DepartmentOfficersComponent } from './department-officers/department-officers.component';
import { AddEditDepartmentOfficerComponent } from './department-officers/add-edit-department-officer/add-edit-department-officer.component';

@NgModule({
  declarations: [
    StreetsComponent,
    AddEditStreetDialogComponent,
    PartsOfTheCityComponent,
    AddEditPartOfTheCityComponent,
    MessagesComponent,
    DepartmentOfficersComponent,
    AddEditDepartmentOfficerComponent,
  ],
  imports: [CoreModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class AdminModule {}
