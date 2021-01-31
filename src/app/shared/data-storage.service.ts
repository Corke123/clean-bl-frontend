import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../modules/reports/report.model';
import { ReportService } from '../modules/reports/report.service';
import { catchError, take, tap } from 'rxjs/operators';
import { Comment } from './comment.model';
import { AuthService } from '../modules/auth/auth.service';
import {
  Department,
  PartOfTheCity,
  ReportPayload,
} from '../modules/reports/add-report/add-report.component';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  storeReport(report: ReportPayload) {
    this.authService.user.pipe(take(1)).subscribe((user) => {});
    this.http
      .post<Report>('http://localhost:8080/api/reports/', report)
      .subscribe((response) => {
        const newReports = this.reportService.reports.slice();
        newReports.push(response);
        this.reportService.setReports(newReports);
        console.log(response);
      });
  }

  getReports() {
    return this.http
      .get<Report[]>('http://localhost:8080/api/reports/')
      .pipe(tap((reports) => this.reportService.setReports(reports)));
  }

  storeComment(comment: string) {
    return this.http
      .post<Comment>(
        'http://localhost:8080/api/reports/' +
          this.reportService.selectedReport.id +
          '/comments/',
        { content: comment }
      )
      .pipe(
        tap((comment) => {
          const newComments = this.reportService.comments.slice();
          newComments.push(
            new Comment(
              comment.username,
              new Date(+comment.dateOfPublication * 1000),
              comment.content
            )
          );
          this.reportService.setComments(newComments);
        })
      );
  }

  getCommentsForReport(reportId: number) {
    return this.http
      .get<Comment[]>(
        'http://localhost:8080/api/reports/' + reportId + '/comments/'
      )
      .pipe(
        tap((comments) => {
          const newComments: Comment[] = [];
          comments.map((comment, index) => {
            newComments.push(
              new Comment(
                comment.username,
                new Date(+comment.dateOfPublication * 1000),
                comment.content
              )
            );
          });
          this.reportService.setComments(newComments);
        })
      );
  }

  getLocations() {
    return this.http.get<PartOfTheCity[]>(
      'http://localhost:8080/api/locations'
    );
  }

  getDepartments() {
    return this.http.get<Department[]>('http://localhost:8080/api/departments');
  }
}
