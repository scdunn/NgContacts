import { Component } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public appConfigService: AppConfigService) {

  }

  setLanguage(lang: string) {
    this.appConfigService.setLanguage(lang);
  }
}
