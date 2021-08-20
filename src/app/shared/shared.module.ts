import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { StatusDirectiveDirective } from './directives/status-directive.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { MonthlyReviewComponent } from './components/statistics/monthly-review/monthly-review.component';
import { DepartmentReviewComponent } from './components/statistics/department-review/department-review.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmationDialogComponent,
    StatusDirectiveDirective,
    PageNotFoundComponent,
    StatisticsComponent,
    MonthlyReviewComponent,
    DepartmentReviewComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    HighchartsChartModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    StatusDirectiveDirective,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
