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
		return this.http.post<any>('/api/article/save-new', article, {observe: 'response'})
	}

}
