import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Comment } from 'src/app/shared/model/comment.model';
import { ReportService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input('reportId') reportId: number;
  comments: Comment[] = [];

  subscription: Subscription;
  isAuthenticated = false;

  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reportService
      .getCommentsForReport(this.reportId)
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });

    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  refreshComments(comment: Comment) {
    this.comments = [...this.comments, comment];
  }
}
