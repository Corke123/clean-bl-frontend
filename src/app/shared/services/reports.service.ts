import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getReports(params): Observable<any> {
    return this.http.get<Report[]>(`${this.baseURL}`, { params });
  }

  public getReportsForDepartmentOfficer(
    pageIndex: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    status: string,
    title: string,
    username: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection)
      .set('status', status)
      .set('title', title)
      .set('username', username);
    return this.http.get<Report[]>(`${this.baseURL}/department-officer`, {
      params: params,
    });
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

  public rateReport(reportId: number, grade: number) {
    return this.http.post<number>(`${this.baseURL}/${reportId}/rating`, {
      grade: grade,
    });
  }
}
