import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
url='http://localhost:3000/Contact';
  addContact(contact: Contact):Observable<Contact> {
    return this.http.post<Contact>('http://localhost:3000/Contact', contact);
  }
  getContactsForUser(userId: any): Observable<Contact[]> {
    
    return this.http.get<Contact[]>(`${this.url}?userId=${userId}`);
  }
  
  getContactById(contactId: number): Observable<Contact> {
    const contactUrl = `${this.url}/${contactId}`;
    return this.http.get<Contact>(contactUrl);
  }

}
