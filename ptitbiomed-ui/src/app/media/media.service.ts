import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMedia} from "../shared/model/IMedia";
import {IPaginator} from "../shared/model/Paginator";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  getAllImages(paginator: IPaginator<IMedia>): Observable<HttpResponse<IPaginator<IMedia>>> {
    return this.http.post<IPaginator<IMedia>>('/api/media/image', paginator, {observe: 'response'});
  }

  getAllVideos(paginator: IPaginator<IMedia>): Observable<HttpResponse<IPaginator<IMedia>>> {
    return this.http.post<IPaginator<IMedia>>('/api/media/video', paginator, {observe: 'response'});
  }
}
