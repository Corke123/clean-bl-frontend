import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { DepartmentOfficersComponent } from './department-officers/department-officers.component';
import { AddEditDepartmentOfficerComponent } from './department-officers/add-edit-department-officer/add-edit-department-officer.component';

@NgModule({
  declarations: [
    MessagesComponent,
    DepartmentOfficersComponent,
    AddEditDepartmentOfficerComponent,
  ],
  imports: [CoreModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class AdminModule {}
