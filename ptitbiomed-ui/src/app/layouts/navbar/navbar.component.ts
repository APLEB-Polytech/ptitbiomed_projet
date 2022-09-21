import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {IMenu} from "../../shared/model/IMenu";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  menuItems: IMenu[] | undefined;
  menuItemsAdmin: IMenu[] = [
    {
      id: 0,
      label: 'Administration',
      link: '',
      rank: 0,
      submenuas: [
        {
          id: 0,
          label: 'Utilisateurs',
          link: '/admin/user',
          submenubs: [],
        },
        {
          id: 1,
          label: 'Panel',
          link: '/admin/panel',
          submenubs: []
        },
        {
          id: 2,
          label: 'Medias',
          link: '',
          submenubs: [
            {
              id: 1,
              label: 'Liste des medias',
              link: '/medias'
            },
            {
              id: 2,
              label: 'Upload d\'un media',
              link: '/medias/upload'
            }
          ]
        },
        {
          id: 3,
          label: 'Articles',
          link: '',
          submenubs: [
            {
              id: 1,
              label: 'Liste des articles',
              link: '/article'
            },
            {
              id: 2,
              label: 'Upload d\'un article',
              link: '/article/new'
            }
          ]
        }
      ]
    },

  ]

  constructor(public userService: UserService, public menuService: MenuService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.menuItems == undefined) {
      this.loadMenu();
    }
  }

  loadMenu() {
    this.menuService.getAllMenu().subscribe(
      (data) => {
        if (data.ok && data.body) {
          this.menuItems = data.body;
        }
      });
  }

  logout(): void {
    this.userService.logout()
    this.router.navigate(['']);
  }

}
