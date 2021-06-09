import { NgModule } from '@angular/core';
import { DefaultComponent } from './default.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { ReportModule } from 'src/app/modules/reports/reports.module';
import { AdminModule } from 'src/app/modules/admin/admin.module';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    AuthModule,
    ReportModule,
    AdminModule,
  ],
})
export class DefaultModule {}
