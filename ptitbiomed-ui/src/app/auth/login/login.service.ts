import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IAuthRequest} from "./AuthRequest";
import {Observable} from "rxjs";
import {IAuthResponse} from "./AuthResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  public login(authRequest: IAuthRequest): Observable<HttpResponse<IAuthResponse>> {
    return this.http.post<IAuthResponse>("/api/auth/signin", authRequest, {observe: "response"})
  }
}
