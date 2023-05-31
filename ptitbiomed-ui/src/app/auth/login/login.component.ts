import {Component, inject} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {AuthRequest} from "./AuthRequest";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  invalid = false
  loginForm = new UntypedFormGroup({
    id: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
  });

  private loginService: LoginService = inject(LoginService)
  private userService: UserService = inject(UserService)
  private menuService: MenuService = inject(MenuService)
  private router: Router = inject(Router)


  public submit(): void {
    const authRequest = new AuthRequest(this.loginForm.controls['id'].value, this.loginForm.controls['password'].value)
    this.loginService.login(authRequest)
      .subscribe({
        next: (res) => {
          if (res.ok && res.body) {
            this.userService.authenticate(res.body)
            this.menuService.refreshNavbar.emit();
            this.router.navigate(['']).then()
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.invalid = true
          }
        }
      })
  }

}
