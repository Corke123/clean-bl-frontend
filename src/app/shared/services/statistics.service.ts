import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsData } from '../model/statistics-data.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  baseURL = 'http://localhost:8080/api/v1/statistics';

  constructor(private http: HttpClient) {}

  getMonthlyStatistics(year: number): Observable<any> {
    return this.http.get<StatisticsData[]>(`${this.baseURL}`, {
      params: new HttpParams().set('year', year.toString()),
    });
  }

  getAverageGrade(year: number, departmentService: string): Observable<any> {
    return this.http.get<StatisticsData[]>(
      `${this.baseURL}/by-department-service`,
      {
        params: new HttpParams()
          .set('year', year.toString())
          .set('departmentServiceName', departmentService),
      }
    );
  }
}
