import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(private http: HttpClient) { }

  getHello(): Observable<HttpResponse<String>> {
    return this.http.get<String>('/api/hello', {observe:"response"});
  }
}
