import {inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserService} from "../../services/user.service";


export const ConnectedGuard = (): BehaviorSubject<boolean> => {
  return inject(UserService).isConnected
}
