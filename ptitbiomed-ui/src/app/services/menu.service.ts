import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMenu} from "../shared/model/IMenu";
import {ISubmenua} from "../shared/model/ISubmenua";
import {rankMenu} from "../admin/panel/panel.component";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getAllMenu(): Observable<HttpResponse<IMenu[]>> {
    return this.http.get<IMenu[]>('/api/menu', {observe: 'response'});
  }

  addMenu(menu: IMenu): Observable<HttpResponse<any>> {
    return this.http.post<any>('/api/menu/add/menu', menu, {observe: 'response'});
  }

  addSubmenua(submenu: ISubmenua): Observable<HttpResponse<any>> {
    return this.http.post<any>('/api/menu/add/submenua', submenu, {observe: 'response'});
  }

  updateRank(rankMenu: rankMenu): Observable<HttpResponse<void>> {
    return this.http.post<void>('/api/menu/rank', rankMenu, {observe: "response"})
  }

}
