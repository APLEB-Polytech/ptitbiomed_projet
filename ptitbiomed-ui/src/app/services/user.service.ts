import {Injectable} from '@angular/core';
import {IAuthResponse} from "../auth/login/AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: IAuthResponse


  constructor() {
  }

  /**
   * Attribue les variables booléenes definissant l'état de droit d'un untilisateur
   */
  makeRight(): void {
    if (this.user?.roles) {
      this.user.admin = this.user.roles.includes("ROLE_ADMIN");
      this.user.modo = this.user.roles.includes("ROLE_MODERATOR");
    }
  }

  isAdmin(): boolean {
    if (this.user?.admin === undefined) return false;
    return this.user.admin;
  }

  isModo(): boolean {
    if (this.user?.admin === undefined) return false;
    return this.user.admin;
  }
}
