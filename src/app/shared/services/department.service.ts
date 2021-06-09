import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../model/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<Department[]>(
      'http://localhost:8080/api/v1/departments'
    );
  }
}
