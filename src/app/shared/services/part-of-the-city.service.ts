import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartOfTheCity } from '../model/part-of-the-city.model';

@Injectable({
  providedIn: 'root',
})
export class PartOfTheCityService {
  constructor(private http: HttpClient) {}

  getPartsOfTheCity() {
    return this.http.get<PartOfTheCity[]>(
      'http://localhost:8080/api/v1/parts-of-the-city'
    );
  }

  getPartsOfTheCitySimple() {
    return this.http.get<PartOfTheCity[]>(
      'http://localhost:8080/api/v1/parts-of-the-city/simple'
    );
  }
}
