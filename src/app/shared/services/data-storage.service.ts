import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';
import { PartOfTheCity } from '../model/part-of-the-city.model';
import { Department } from '../model/department.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getLocations() {
    return this.http.get<PartOfTheCity[]>(
      'http://localhost:8080/api/v1/locations'
    );
  }

  getDepartments() {
    return this.http.get<Department[]>(
      'http://localhost:8080/api/v1/departments'
    );
  }
}
