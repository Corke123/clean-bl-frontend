import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartOfTheCity } from '../model/part-of-the-city.model';

@Injectable({
  providedIn: 'root',
})
export class PartOfTheCityService {
  baseURL = `http://localhost:8080/api/v1/parts-of-the-city`;

  constructor(private http: HttpClient) {}

  getPartsOfTheCity() {
    return this.http.get<PartOfTheCity[]>(this.baseURL);
  }

  public getPartsOfTheCityPageable(
    page: number,
    size: number,
    sort: string,
    direction: string,
    searchString: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/pageable?page=${page}&size=${size}&sort=${sort}&order=${direction}&name=${searchString}`
    );
  }

  getPartsOfTheCitySimple() {
    return this.http.get<PartOfTheCity[]>(`${this.baseURL}/simple`);
  }

  public addPartOfThecity({ name }: { name: string }) {
    return this.http.post<PartOfTheCity>(`${this.baseURL}`, {
      name: name,
    });
  }

  public updatePartOfTheCity(
    id: number,
    {
      name,
    }: {
      name: string;
    }
  ) {
    return this.http.put<PartOfTheCity>(`${this.baseURL}/${id}`, {
      name: name,
    });
  }

  public deletePartOfTheCity(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
