import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
