import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../shared/model/IUser";
import {UserSignupRequest} from "./add-user/UserSignupRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(`api/user`, {observe: "response"})
  }

  public deleteUser(idUser: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`api/user/${idUser}`, {observe: "response"})
  }

  public addUser(authRequest: UserSignupRequest): Observable<HttpResponse<void>> {
    return this.http.post<void>(`api/auth/signup`, authRequest, {observe: "response"})
  }
}
