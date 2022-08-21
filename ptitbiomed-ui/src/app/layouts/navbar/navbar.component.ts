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

  constructor(public userService: UserService, public menuService: MenuService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.menuItems == undefined) {
      this.loadMenu()
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
