import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMenu} from "../shared/model/IMenu";

export interface MenuSortDto {
  idParent?: number,
  sortedChildrenIds: number[],
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  public refreshNavbar: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  getAllMenu(): Observable<HttpResponse<IMenu[]>> {
    return this.http.get<IMenu[]>('/api/menu', {observe: 'response'});
  }

  createMenu(menu: IMenu): Observable<HttpResponse<any>> {
    return this.http.post<any>('/api/menu', menu, {observe: 'response'});
  }

  editMenu(editedMenu: IMenu): Observable<HttpResponse<any>> {
    return this.http.post<any>('/api/menu/' + editedMenu.id, editedMenu, {observe: 'response'});
  }

  deleteMenu(menuId: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>('/api/menu/' + menuId, {observe: 'response'});
  }

  sortMenusForParent(sort: MenuSortDto): Observable<HttpResponse<void>> {
    return this.http.post<void>('/api/menu/sort', sort, {observe: "response"})
  }
}
