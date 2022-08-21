import {Injectable} from '@angular/core';
import {IAuthResponse} from "../auth/login/AuthResponse";
import {BehaviorSubject, Subject} from "rxjs";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAuthResponse?: IAuthResponse
  user: Subject<IAuthResponse> = new Subject<IAuthResponse>()
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)


  constructor(private cookieService: CookieService) {
    this.checkCookie()
  }

  checkCookie(): void {
    const authJson: string = this.cookieService.getCookie("userInfo");
    if (authJson === '')
      return;
    const iAuthResponse: IAuthResponse = JSON.parse(atob(authJson)) as IAuthResponse
    this.authenticate(iAuthResponse)
  }

  authenticate(authResponse: IAuthResponse): void {
    this.isConnected.next(true)
    this.user.next(authResponse)
    this.userAuthResponse = authResponse
    this.cookieService.setCookie({
      name: 'userInfo',
      value: btoa(JSON.stringify(authResponse)),
      expireDays: 1
    })
  }

  logout(): void {
    this.userAuthResponse = undefined
    this.isConnected.next(false)
    this.cookieService.deleteCookie('userInfo')
  }
}
