import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportLocation } from '../model/report-location';

@Injectable({
  providedIn: 'root',
})
export class ReportLocationsService {
  constructor(private http: HttpClient) {}

  getReportsByLocation() {
    return this.http.get<ReportLocation[]>(
      'http://localhost:8080/api/v1/reports/location'
    );
  }
}
