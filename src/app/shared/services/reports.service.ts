import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../model/report.model';
import { Comment } from '../model/comment.model';
import { ReportPayload } from '../model/report-payload.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseURL = 'http://localhost:8080/api/v1/reports';

  constructor(private http: HttpClient) {}

  public storeReport(report: ReportPayload) {
    return this.http.post<Report>(`${this.baseURL}`, report);
  }

  public getReports(page: number, size: number): Observable<any> {
    return this.http.get<Report[]>(`${this.baseURL}?page=${page}&size=${size}`);
  }

  public getReportsForDepartmentOfficer(
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get<Report[]>(
      `${this.baseURL}/department-officer?page=${page}&size=${size}`
    );
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

  public modifyDepartmentForReport(reportId: number, department: any) {
    return this.http.patch<Report>(
      `${this.baseURL}/${reportId}/department`,
      department
    );
  }

  public addDepartmentServiceToReport(
    reportId: number,
    departmentService: any
  ) {
    return this.http.patch<Report>(
      `${this.baseURL}/${reportId}/department-service`,
      departmentService
    );
  }

  public approveReport(reportId: number) {
    return this.http.patch<Report>(`${this.baseURL}/${reportId}/approve`, null);
  }

  public rejectReport(reportId: number) {
    return this.http.patch<Report>(`${this.baseURL}/${reportId}/reject`, null);
  }
}
