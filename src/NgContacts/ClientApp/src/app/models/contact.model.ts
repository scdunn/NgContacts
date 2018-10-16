export class Contact {
  public id: string;
  public firstName: string;
  public lastName: string;
  public emailAddress: string;
  public phone: string;
  public dob: string;
  public street: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public company: string;
  public jobTitle: string;


  constructor(source: any | null) {
    if (source != null)
      (<any>Object).assign(this, source);
  }

  get fullName(): string { return this.lastName + ", " + this.firstName; }
  get label(): string { return this.lastName.substring(0, 1) + this.firstName.substring(0, 1); }
}
