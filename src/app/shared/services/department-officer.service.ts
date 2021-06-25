import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentOfficer } from '../model/department-officer.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentOfficerService {
  private baseURL = 'http://localhost:8080/api/v1/users/department-officers';

  constructor(private http: HttpClient) {}

  public getDepartmentOfficers() {
    return this.http.get<DepartmentOfficer[]>(`${this.baseURL}`);
  }

  public addDepartmentOfficer(departmentOfficer: DepartmentOfficer) {
    return this.http.post<DepartmentOfficer>(
      `${this.baseURL}`,
      departmentOfficer
    );
  }

  public updateDepartmentOfficer(
    id: number,
    departmentOfficer: DepartmentOfficer
  ) {
    return this.http.put<DepartmentOfficer>(
      `${this.baseURL}/${id}`,
      departmentOfficer
    );
  }

  public deleteDepartmentOfficer(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
