import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddReportComponent } from './reports/add-report/add-report.component';
import { AddCommentComponent } from './reports/report-detail/add-comment/add-comment.component';
import { CommentItemComponent } from './reports/report-detail/comment-list/comment-item/comment-item.component';
import { CommentListComponent } from './reports/report-detail/comment-list/comment-list.component';
import { ReportDetailComponent } from './reports/report-detail/report-detail.component';
import { ReportItemComponent } from './reports/report-list/report-item/report-item.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    ContactUsComponent,
    ReportsComponent,
    ReportListComponent,
    ReportItemComponent,
    ReportDetailComponent,
    CommentListComponent,
    CommentItemComponent,
    AddCommentComponent,
    AddReportComponent,
  ],
  imports: [CoreModule, FormsModule, RouterModule],
})
export class UserModule {}