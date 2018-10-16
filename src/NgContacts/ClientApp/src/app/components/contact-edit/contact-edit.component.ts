import { Component, OnInit, Input } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact.model';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { AppConfigService } from '../../services/app-config.service';


@Component({
  selector: 'cid-contact-edit',
  styleUrls: ['./contact-edit.component.css'],
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent  implements OnInit {

  isSaved: boolean = false;
  isEdit: boolean = false;

  contactForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  emailAddress: FormControl;
  phone: FormControl;
  company: FormControl;
  jobTitle: FormControl;
  street: FormControl;
  city: FormControl;
  state: FormControl;
  zipCode: FormControl;

  private _contact: Contact;

  @Input() set contact(value: Contact) {
    this.isEdit = false;
    this._contact = value;
    if (value != null) {
      this.contactForm.patchValue(this.contact, { onlySelf: true });
    }
  }

  get contact(): Contact { return this._contact;}

  constructor(private contactsService: ContactsService, public appConfigService: AppConfigService) { }

  ngOnInit() {
    this.firstName = new FormControl("", Validators.required);
    this.lastName = new FormControl("", Validators.required);
    this.emailAddress = new FormControl("", [Validators.required, Validators.email]);
    this.phone = new FormControl("", [Validators.required, Validators.pattern('\\d{3}-\\d{3}-\\d{4}')]);
    this.company = new FormControl("", Validators.required);
    this.jobTitle = new FormControl("", Validators.required);
    this.street = new FormControl("", Validators.required);
    this.city = new FormControl("", Validators.required);
    this.state = new FormControl("", Validators.required);
    this.zipCode = new FormControl("", Validators.required);

    this.contactForm = new FormGroup(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress: this.emailAddress,
        phone: this.phone,
        company: this.company,
        jobTitle: this.jobTitle,
        street: this.street,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode
      });

    
    
  }

  onSubmit() {

    if (this.contactForm.valid) {
      let uContact = new Contact(null);

      Object.assign(this._contact, this.contactForm.value);

      this.contactsService.updateContact(this._contact).subscribe(
        response => { this.isSaved = true; setTimeout(() => { this.isSaved = false; }, 3000) },
        error=>console.log(error)
      );
      
      
      this.contactForm.reset();
      this.contact = this._contact;
    }


  }

  onEdit() {
    this.isEdit = true;
  }

  onCancel() {
    this.isEdit = false;
    this.contactForm.reset();
    this.contact = this._contact;
  }

}
