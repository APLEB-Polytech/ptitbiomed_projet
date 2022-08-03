import {Injectable} from '@angular/core';
import {IAuthResponse} from "../auth/login/AuthResponse";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAuthResponse?: IAuthResponse
  user: Subject<IAuthResponse> = new Subject<IAuthResponse>()
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)


  constructor() {
  }

  authenticate(authResponse: IAuthResponse) {
    this.isConnected.next(true)
    this.isAdmin.next(authResponse.roles.includes('ROLE_ADMIN'))
    this.user.next(authResponse)
    this.userAuthResponse = authResponse
  }

  logout() {
    this.isAdmin.next(false)
    this.userAuthResponse = undefined
    this.isConnected.next(false)
  }
}
