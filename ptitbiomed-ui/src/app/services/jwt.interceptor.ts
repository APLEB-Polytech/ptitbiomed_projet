import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from "./user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.userService.userAuthResponse?.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.userAuthResponse?.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
