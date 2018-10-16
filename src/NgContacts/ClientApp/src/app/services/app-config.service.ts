import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operator/map';



@Injectable()
export class AppConfigService {

  public version: string;
  public showsearch: string;
  public apiEndpointContacts: string;
  public languages: any;
  public lang: any;

  constructor(private http: HttpClient) {}


  setLanguage(newLanguage:string ) {
    if (newLanguage == "es")
      this.lang = this.languages.es;
    else
      this.lang = this.languages.en;
  }

  getText(key: string) : string{

    if (this.lang.hasOwnProperty(key)) {
      return this.lang[key];
    }
    else {
      return '[' + key + ']';
    }
  }


  load() :Promise <any> {

      const promise = this.http.get('/assets/app.config.json')
        .toPromise()
        .then(data => {
          Object.assign(this, data);
          this.setLanguage("en");
          return data;
        });

      return promise;
  }
}
