import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IMenu} from "../../shared/model/IMenu";
import {MenuService} from "../../services/menu.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  image = environment.logo
  env = environment.titre
  menuItems?: IMenu[];
  menuItemsAdmin: IMenu[] = [
    {
      id: -1,
      label: 'Administration',
      rank: 0,
      hidden: false,
    },
    {
      id: -10,
      label: 'Utilisateurs',
      link: '/admin/user',
      rank: 0,
      idParent: -1,
      hidden: false,
    },
    {
      id: -11,
      label: 'Panel',
      link: '/admin/panel',
      rank: 1,
      idParent: -1,
      hidden: false,
    },
    {
      id: -12,
      label: 'Médias',
      rank: 2,
      idParent: -1,
      hidden: false,
    },
    {
      id: -120,
      label: 'Liste des médias',
      link: '/medias',
      rank: 1,
      idParent: -12,
      hidden: false,
    },
    {
      id: -121,
      label: "Upload d'un média",
      link: '/medias/upload',
      rank: 2,
      idParent: -12,
      hidden: false,
    },
    {
      id: -13,
      label: 'Articles',
      rank: 3,
      idParent: -1,
      hidden: false,
    },
    {
      id: -130,
      label: 'Liste des articles',
      link: '/article',
      rank: 0,
      idParent: -13,
      hidden: false,
    },
    {
      id: -131,
      label: "Upload d'un article",
      link: '/article/new',
      rank: 1,
      idParent: -13,
      hidden: false,
    },
    {
      id: -14,
      label: 'Catégories',
      link: '/admin/category-panel',
      rank: 4,
      idParent: -1,
      hidden: false,
    },
  ];

  constructor(public userService: UserService, public menuService: MenuService) {
  }

  ngOnInit(): void {
      this.loadMenu();
      this.menuService.refreshNavbar.subscribe(() => {
        this.loadMenu();
      });
  }

  loadMenu() {
    this.userService.isConnected.subscribe((connected: boolean) => {
      let menuRequest = connected
        ? this.menuService.getAllMenuWithHidden()
        : this.menuService.getAllMenu();

      menuRequest.subscribe((menus: IMenu[]) => {
        this.menuItems = menus;
      });
    });
  }

}
