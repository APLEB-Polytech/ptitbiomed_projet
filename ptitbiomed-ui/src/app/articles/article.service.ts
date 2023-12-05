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

  addArticle(article: IArticle): Observable<HttpResponse<void>> {
    return this.http.post<void>('/api/article', article, {observe: 'response'})
  }

  getAllArticles(): Observable<HttpResponse<IArticle[]>> {
    return this.http.get<IArticle[]>('/api/article', {observe: 'response'})
  }

  updateArticle(article: IArticle): Observable<HttpResponse<void>> {
    return this.http.put<void>('/api/article', article, {observe: 'response'})
  }

  getArticleByUUID(uuid: string): Observable<HttpResponse<IArticle>> {
    return this.http.get<IArticle>('/api/article/' + uuid, {observe: 'response'})
  }

  deleteArticle(uuid: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>('/api/article/' + uuid, {observe: 'response'})
  }

  getAccueil(): Observable<HttpResponse<IArticle>> {
    return this.http.get<IArticle>('/api/article/accueil', {observe: 'response'})
  }

}
