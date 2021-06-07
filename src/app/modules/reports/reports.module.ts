import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AddReportComponent } from './add-report/add-report.component';
import { AddCommentComponent } from './report-detail/add-comment/add-comment.component';
import { CommentItemComponent } from './report-detail/comment-list/comment-item/comment-item.component';
import { CommentListComponent } from './report-detail/comment-list/comment-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportItemComponent } from './report-list/report-item/report-item.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [
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
export class ReportModule {}
