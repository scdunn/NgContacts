import { Component, OnInit, EventEmitter , Output} from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact.model';
import { ContactsResult } from '../../models/contacts-result.model';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'cid-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent  implements OnInit {

  query: string = "";
  currentPage: number = 1;
  result: ContactsResult;
  current: Contact;
  

  @Output() contactClicked: EventEmitter<Contact> = new EventEmitter<Contact>();


  constructor(private contactsService: ContactsService, public appConfigService: AppConfigService) { }

  onClicked(contact: Contact) {
    this.current = contact;
    this.contactClicked.emit(contact);
  }


  onSearch(page: number = 1) {
    this.currentPage = page;
    this.contactsService.getContacts(this.query, 10, page).subscribe((data: ContactsResult) => { this.result = data });
    this.onClicked(null);
    return false;
  }

  ngOnInit() {
    this.onSearch();
  }
}
