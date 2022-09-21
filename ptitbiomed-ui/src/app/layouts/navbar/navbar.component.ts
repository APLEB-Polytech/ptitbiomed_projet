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
          rank: 0,
          submenubs: [],
        },
        {
          id: 1,
          label: 'Panel',
          link: '/admin/panel',
          submenubs: [],
          rank: 1,
        },
        {
          id: 2,
          label: 'Medias',
          link: '',
          rank: 2,
          submenubs: [
            {
              id: 1,
              label: 'Liste des medias',
              link: '/medias',
              rank: 1,
            },
            {
              id: 2,
              label: 'Upload d\'un media',
              link: '/medias/upload',
              rank: 2,
            }
          ]
        },
        {
          id: 3,
          label: 'Articles',
          link: '',
          rank: 3,
          submenubs: [
            {
              id: 1,
              label: 'Liste des articles',
              link: '/article',
              rank: 1,
            },
            {
              id: 2,
              label: 'Upload d\'un article',
              link: '/article/new',
              rank: 2,
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
          this.sortOnRank()
        }
      });
  }

  sortOnRank(): void {
    this.menuItems = this.menuItems?.sort((a, b) => {
      return (a.rank >= b.rank) ? 1 : -1
    })
    this.menuItems?.forEach((value) => {
      value.submenuab?.forEach((value2) => {
        value.submenuas = value.submenuas?.sort((a, b) => {
          return (a.rank >= b?.rank) ? 1 : -1
        })
      })
      value.submenuas = value.submenuas?.sort((a, b) => {
        return (a.rank >= b?.rank) ? 1 : -1
      })
    })
  }

  logout(): void {
    this.userService.logout()
    this.router.navigate(['']);
  }

}
