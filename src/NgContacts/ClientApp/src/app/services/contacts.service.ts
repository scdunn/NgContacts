import { Injectable } from '@angular/core';

//http data retrieval imports
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

//results of search
import { ContactsResult } from '../models/contacts-result.model';
import { Contact } from '../models/contact.model';
import { AppConfigService } from './app-config.service';


// Contacts Service provides data services to get contact information from remote server.
@Injectable()
export class ContactsService {

  //pass in http client for rest data retrieval
  constructor(private http: HttpClient, private config:AppConfigService) { }

  // Returns an observable of contacts results which can be subscribed to.
  // ContactsResult contains contact list and result counts and paging information.
  // count = results per page, page = page to view, query = search text
  getContacts(query:string, count:number, page:number):Observable<ContactsResult> {
    return this.http.get<ContactsResult>(this.config.apiEndpointContacts + query + "?count=" + count + "&page=" + page)
      .map((res: ContactsResult) => new ContactsResult(res.contacts, res.totalCount, res.pageCount));
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put<Contact>(this.config.apiEndpointContacts, contact);
  }

}

