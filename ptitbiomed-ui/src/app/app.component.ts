import {Component, inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ConfigurationService} from "./services/configuration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static readonly APP_TITLE = 'APP_TITLE'
  private readonly configurationService = inject(ConfigurationService);
  private readonly titleService = inject(Title);

  constructor() {
    this.processTitle()
  }

  processTitle() {
    const title = localStorage.getItem(AppComponent.APP_TITLE)
    if (!title) {
      return this.fetchTitle()
    }
    this.titleService.setTitle(`${title}`)
  }

  fetchTitle() {
    this.configurationService.getTitle().subscribe((title) => {
      this.titleService.setTitle(`${title}`)
      localStorage.setItem(AppComponent.APP_TITLE, title)
    })
  }
}
