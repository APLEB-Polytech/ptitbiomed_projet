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
    return this.http.get<IUser[]>(`api/users`, {observe: "response"})
  }

  public deleteUser(idUser: number): Observable<HttpResponse<any>> {
    return this.http.delete(`api/users/${idUser}`, {observe: "response"})
  }

  public addUser(authReauest: UserSignupRequest): Observable<HttpResponse<any>> {
    return this.http.post(`api/auth/signup`, authReauest, {observe: "response"})
  }
}
