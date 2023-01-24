import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory} from "../shared/model/ICategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/category');
  }

  getCategory(categoryUuid: string): Observable<ICategory> {
    return this.http.get<ICategory>('api/category/' + categoryUuid);
  }

  createCategory(name: string): Observable<HttpResponse<void>> {
    return this.http.post<void>('/api/category', name, {observe: 'response'});
  }

  updateCategory(category: ICategory): Observable<HttpResponse<void>> {
    return this.http.put<void>('/api/category', category, {observe: 'response'});
  }

  deleteCategory(categoryUuid: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>('/api/category/' + categoryUuid, {observe: 'response'});
  }
}
