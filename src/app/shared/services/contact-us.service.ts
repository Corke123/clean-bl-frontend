import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactUsMessage } from '../model/contact-us-message.model';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  baseURL = `http://localhost:8080/api/v1/contact-us-messages`;

  constructor(private http: HttpClient) {}

  public addMessage(contactUsMessage: ContactUsMessage) {
    return this.http.post<ContactUsMessage>(
      `${this.baseURL}`,
      contactUsMessage
    );
  }

  public getCotactUsMessagesPageable(
    page: number,
    size: number,
    sort: string,
    direction: string,
    searchString: string,
    all: boolean
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}?page=${page}&size=${size}&sort=${sort}&order=${direction}&searchString=${searchString}&all=${all}`
    );
  }

  public sendReply(id: number, replyMessage: { replyMessage: string }) {
    return this.http.put<ContactUsMessage>(
      `${this.baseURL}/${id}`,
      replyMessage
    );
  }
}
