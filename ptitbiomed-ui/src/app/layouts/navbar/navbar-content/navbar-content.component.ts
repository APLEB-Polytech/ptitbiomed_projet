import {Component, Input} from '@angular/core';
import {IMenu} from "../../../shared/model/IMenu";

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.css']
})
export class NavbarContentComponent {

  @Input()
  menus: IMenu[] = [];

  getRootItems() {
    return this.menus.filter(menu => !menu.idParent);
  }

  getChildren(item: IMenu): IMenu[] {
    return this.menus.filter(menu => menu.idParent === item.id)
      .sort((a, b) => a.rank - b.rank);
  }

  getLink(item: IMenu): string | null {
    if (item.link) return item.link;
    if (item.idArticle) return '/article/view/' + item.idArticle;
    if (item.idCategory) return '/category/view/' + item.idCategory;
    return null;
  }

  isExternal(item: IMenu): boolean {
    return !!item.link && /^https?:\/\//.test(item.link);
  }

}
