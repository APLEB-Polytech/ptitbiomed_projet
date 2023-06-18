import {inject, Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private static readonly APP_TITLE = 'APP_TITLE';

  private readonly title: Title = inject(Title);
  private readonly configurationService: ConfigurationService = inject(ConfigurationService);

  constructor() {
    this.processTitle()
  }

  public getTitle(): string {
    return this.title.getTitle()
  }

  public setTitle(title: string) {
    this.title.setTitle(`${title}`)
    localStorage.setItem(TitleService.APP_TITLE, title)
  }

  private processTitle() {
    const title = localStorage.getItem(TitleService.APP_TITLE)
    if (!title) {
      return this.fetchTitle()
    }
    this.title.setTitle(`${title}`)
  }

  private fetchTitle() {
    this.configurationService.getTitle().subscribe((title) => {
      this.title.setTitle(`${title}`)
      localStorage.setItem(TitleService.APP_TITLE, title)
    })
  }
}
