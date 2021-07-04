import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentServiceModel } from '../model/department-service.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentServiceService {
  constructor(private http: HttpClient) {}

  getDepartmentServices() {
    return this.http.get<DepartmentServiceModel[]>(
      'http://localhost:8080/api/v1/department-services'
    );
  }
}
