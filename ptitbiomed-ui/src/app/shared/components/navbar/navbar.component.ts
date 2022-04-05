import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.user = undefined
    this.router.navigate(['']);
  }

}
