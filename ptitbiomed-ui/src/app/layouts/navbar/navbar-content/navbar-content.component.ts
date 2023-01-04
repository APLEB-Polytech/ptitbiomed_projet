import {Component, Input, OnInit} from '@angular/core';
import {IMenu} from "../../../shared/model/IMenu";

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.css']
})
export class NavbarContentComponent implements OnInit {

  @Input()
  menus: IMenu[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getRootItems() {
    return this.menus.filter(menu => !menu.idParent);
  }

  hasChildren(item: IMenu): boolean {
    return true;
  }

  getChildren(item: IMenu): IMenu[] {
    return this.menus.filter(menu => menu.idParent === item.id)
      .sort((a, b) => a.rank - b.rank);
  }

  getLink(item: IMenu): string | undefined {
    if (item.link) return item.link;
    if (item.idArticle) return '/article/view/' + item.idArticle;
    return undefined;
  }

  isExternal(item: IMenu): boolean {
    return !!item.link && /^https?:\/\//.test(item.link);
  }

}
