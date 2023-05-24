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

  getAllImagesPaginated(paginator: IPaginator<IMedia>): Observable<HttpResponse<IPaginator<IMedia>>> {
    return this.http.post<IPaginator<IMedia>>('/api/media/image', paginator, {observe: 'response'});
  }

  getAllVideosPaginated(paginator: IPaginator<IMedia>): Observable<HttpResponse<IPaginator<IMedia>>> {
    return this.http.post<IPaginator<IMedia>>('/api/media/video', paginator, {observe: 'response'});
  }

  getAllPDFPaginated(paginator: IPaginator<IMedia>): Observable<HttpResponse<IPaginator<IMedia>>> {
    return this.http.post<IPaginator<IMedia>>('/api/media/pdf', paginator, {observe: 'response'});
  }

  getAllImages(): Observable<HttpResponse<IMedia[]>> {
    return this.http.get<IMedia[]>(`/api/media/image`, {observe: "response"})
  }

  getAllVideos(): Observable<HttpResponse<IMedia[]>> {
    return this.http.get<IMedia[]>(`/api/media/video`, {observe: "response"})
  }

  getAllPDF(): Observable<HttpResponse<IMedia[]>> {
    return this.http.get<IMedia[]>(`/api/media/pdf`, {observe: "response"})
  }

  deleteMedia(hash: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`/api/media/${hash}`, {observe: "response"})
  }


}
