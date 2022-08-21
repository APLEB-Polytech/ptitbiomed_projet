import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IArticle} from "../shared/model/IArticle";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  addArticle(article: IArticle): Observable<HttpResponse<any>> {
    return this.http.post<any>('/api/article', article, {observe: 'response'})
  }

  getAllArticles(): Observable<HttpResponse<IArticle[]>> {
    return this.http.get<IArticle[]>('/api/article', {observe: 'response'})
  }

  updateArticle(article: IArticle): Observable<HttpResponse<any>> {
    return this.http.put<any>('/api/article', article, {observe: 'response'})
  }

  getArticleByUUID(uuid: string): Observable<HttpResponse<IArticle>> {
    return this.http.get<IArticle>('/api/article/' + uuid, {observe: 'response'})
  }
  
  deleteArticle(uuid: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>('/api/article/' + uuid, {observe: 'response'})
  }

}
