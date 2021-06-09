import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreetService {
  baseURL = 'http://localhost:8080/api/v1/streets';
  constructor(private http: HttpClient) {}

  public getStreets(
    page: number,
    size: number,
    sort: string,
    direction: string,
    searchString: string,
    partOfTheCity: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}?page=${page}&size=${size}&sort=${sort}&order=${direction}&name=${searchString}&part-of-the-city=${partOfTheCity}`
    );
  }
}
