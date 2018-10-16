import { Contact } from "./contact.model";

export class ContactsResult {

  contacts: Contact[];
  totalCount: number;
  pageCount: number;

  pages: number[] = new Array<number>();

  constructor(sourceContacts: Contact[], sourceTotalCount: number, sourcePageCount:number) {
    this.contacts = new Array<Contact>();
    for (let contact of sourceContacts) {
      this.contacts.push(new Contact(contact));
    }
    this.totalCount = sourceTotalCount;
    this.pageCount = sourcePageCount < 9 ? sourcePageCount : 9;
    for (var i = 1; i <= this.pageCount; i++)
      this.pages.push(i);
  }

}

