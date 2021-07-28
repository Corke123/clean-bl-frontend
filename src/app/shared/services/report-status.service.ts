import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportStatus } from '../model/report-status.model';

@Injectable({
  providedIn: 'root',
})
export class ReportStatusService {
  private baseURL = 'http://localhost:8080/api/v1/report-statuses';

  constructor(private http: HttpClient) {}

  public getReportStatuses() {
    return this.http.get<ReportStatus[]>(this.baseURL);
  }
}
