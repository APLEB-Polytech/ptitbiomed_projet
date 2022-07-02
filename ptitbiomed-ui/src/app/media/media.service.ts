import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMedia} from "../shared/model/IMedia";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  getAllImages(): Observable<HttpResponse<IMedia[]>> {
    return this.http.get<IMedia[]>('/api/media/image', {observe: 'response'});
  }

  getAllVideos(): Observable<HttpResponse<IMedia[]>> {
    return this.http.get<IMedia[]>('/api/media/video', {observe: 'response'});
  }
}
