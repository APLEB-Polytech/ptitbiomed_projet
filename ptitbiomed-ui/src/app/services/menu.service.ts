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

  getAllMenu(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>('/api/menu');
  }

  getAllMenuWithHidden(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>('/api/menu/with-hidden');
  }

  createMenu(menu: IMenu): Observable<HttpResponse<void>> {
    return this.http.post<void>('/api/menu', menu, {observe: 'response'});
  }

  editMenu(editedMenu: IMenu): Observable<HttpResponse<void>> {
    return this.http.put<void>('/api/menu', editedMenu, {observe: 'response'});
  }

  deleteMenu(menuId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>('/api/menu/' + menuId, {observe: 'response'});
  }

  sortMenusForParent(sort: MenuSortDto): Observable<HttpResponse<void>> {
    return this.http.post<void>('/api/menu/sort', sort, {observe: "response"})
  }
}
