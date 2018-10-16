import { Component, OnInit, Input } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'cid-contact-detail',
  styleUrls: ['./contact-detail.component.html'],
  templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent  implements OnInit {

  @Input() contact: Contact;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {}
}
