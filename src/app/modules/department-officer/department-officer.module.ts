import { NgModule } from '@angular/core';
import { ManageReportsComponent } from './manage-reports/manage-reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcessReportComponent } from './process-report/process-report.component';
import { ManagementComponent } from './management/management.component';

@NgModule({
  declarations: [ManageReportsComponent, ProcessReportComponent, ManagementComponent],
  imports: [
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class DepartmentOfficerModule {}
