import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {AuthRequest} from "./AuthRequest";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public submit(): void {
    const authRequest = new AuthRequest(this.loginForm.controls['id'].value, this.loginForm.controls['password'].value)
    this.loginService.login(authRequest).subscribe((res) => {
      if (res.ok && res.body) {
        this.userService.user = res.body
        this.router.navigate([''])
      }
    })
  }

}