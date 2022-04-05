import {Injectable} from '@angular/core';
import {IAuthResponse} from "../auth/login/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: IAuthResponse

  constructor() {
  }
}
