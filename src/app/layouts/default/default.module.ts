import { NgModule } from '@angular/core';
import { DefaultComponent } from './default.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReportsComponent } from 'src/app/modules/reports/reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReportListComponent } from 'src/app/modules/reports/report-list/report-list.component';
import { ReportItemComponent } from 'src/app/modules/reports/report-list/report-item/report-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReportDetailComponent } from 'src/app/modules/reports/report-detail/report-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { CommentListComponent } from 'src/app/modules/reports/report-detail/comment-list/comment-list.component';
import { CommentItemComponent } from 'src/app/modules/reports/report-detail/comment-list/comment-item/comment-item.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddCommentComponent } from 'src/app/modules/reports/report-detail/add-comment/add-comment.component';
import { MatListModule } from '@angular/material/list';
import { AddReportComponent } from 'src/app/modules/reports/add-report/add-report.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    DefaultComponent,
    ReportsComponent,
    ReportListComponent,
    ReportItemComponent,
    ReportDetailComponent,
    CommentListComponent,
    CommentItemComponent,
    SignupComponent,
    LoginComponent,
    AddCommentComponent,
    AddReportComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatToolbarModule,
  ],
})
export class DefaultModule {}
