import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from 'src/app/shared/comment.model';
import { Report } from './report.model';

@Injectable()
export class ReportService {
  reportsChanged = new Subject<Report[]>();
  commentsChanged = new Subject<Comment[]>();
  reports: Report[] = [];
  comments: Comment[] = [];
  selectedReport: Report;

  constructor() {}

  getReports() {
    return this.reports.slice();
  }

  setSelectedReport(report: Report) {
    this.selectedReport = report;
  }

  setReports(reports: Report[]) {
    this.reports = reports;
    this.reportsChanged.next(this.reports.slice());
  }

  setComments(comments: Comment[]) {
    this.comments = comments;
    this.commentsChanged.next(this.comments.slice());
  }

  getReportById(id: number) {
    return this.reports.find((r) => r.id === id);
  }

  getComments() {
    return this.comments.slice();
  }
}
