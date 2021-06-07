import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../model/report.model';
import { Comment } from '../model/comment.model';
import { ReportPayload } from '../model/report-payload.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseURL = 'http://localhost:8080/api/v1/reports';

  constructor(private http: HttpClient) {}

  public storeReport(report: ReportPayload) {
    return this.http.post<Report>(`${this.baseURL}`, report);
  }

  public getReports() {
    return this.http.get<Report[]>(`${this.baseURL}`);
  }

  public getReportById(id: number) {
    return this.http.get<Report>(`${this.baseURL}/${id}`);
  }

  public storeComment(reportId: number, comment: string) {
    return this.http.post<Comment>(`${this.baseURL}/${reportId}/comments`, {
      content: comment,
    });
  }

  public getCommentsForReport(reportId: number) {
    return this.http.get<Comment[]>(`${this.baseURL}/${reportId}/comments`);
  }
}
