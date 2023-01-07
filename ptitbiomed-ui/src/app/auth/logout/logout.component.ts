import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService,
    private menuService: MenuService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.logout();
    this.menuService.refreshNavbar.emit();
    this.router.navigate(['']);
  }

}
