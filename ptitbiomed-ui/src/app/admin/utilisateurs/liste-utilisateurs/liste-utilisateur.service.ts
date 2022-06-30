import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../../shared/model/IUser";

@Injectable({
  providedIn: 'root'
})
export class ListeUtilisateurService {

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>("/api/user", {observe: "response"})
  }

  public getUserByID(idUser: number): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`/api/user/${idUser}`, {observe: "response"})
  }
}
