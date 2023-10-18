import {inject, Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _defaultTitle = 'Ptit Biomed';

  private static readonly APP_TITLE = 'APP_TITLE';

  get defaultTitle(): string {
    return this._defaultTitle;
  }

  private readonly title: Title = inject(Title);
  private readonly configurationService: ConfigurationService = inject(ConfigurationService);

  constructor() {
    this.processTitle()
  }


  public setTitle(title: string) {
    this.title.setTitle(`${title}`)
  }

  private setDefaultTitle(title: string) {
    this._defaultTitle = title;
  }

  private processTitle() {
    const title = localStorage.getItem(TitleService.APP_TITLE)
    if (!title) {
      return this.fetchTitle()
    }
    this.setDefaultTitle(title)
    this.title.setTitle(`${title}`)
  }

  private fetchTitle() {
    this.configurationService.getTitle().subscribe((title) => {
      this.title.setTitle(`${title}`)
      this.setDefaultTitle(title)
      localStorage.setItem(TitleService.APP_TITLE, title)
    })
  }
}
