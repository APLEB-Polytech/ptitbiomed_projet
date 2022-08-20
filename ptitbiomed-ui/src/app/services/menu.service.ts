import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMenu} from "../shared/model/IMenu";
import {ISubmenua} from "../shared/model/ISubmenua";
import {ISubmenub} from "../shared/model/ISubmenub";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getAllMenu(): Observable<HttpResponse<IMenu[]>> {
    return this.http.get<IMenu[]>('/api/menu', {observe: 'response'});
  }

}
