import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'cid-contact-container',
  templateUrl: './contact-container.component.html'

})
export class ContactContainerComponent  implements OnInit {

  contacts: Contact[];

  current: Contact = null;

  contactClicked(contact: Contact) {
    this.current = contact;
  }

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    //this.contactsService.getContacts().subscribe((data: Contact[]) => this.contacts = data);
  }
}
