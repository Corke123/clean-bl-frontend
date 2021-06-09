import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { StreetsComponent } from './streets/streets.component';
import { AddEditStreetDialogComponent } from './streets/add-edit-street-dialog/add-edit-street-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StreetsComponent, AddEditStreetDialogComponent],
  imports: [CoreModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class AdminModule {}
