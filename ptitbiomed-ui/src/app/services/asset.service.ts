import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class AssetService {

  private http = inject(HttpClient);

  /**
   * Retrieves the footer text.
   */
  public getFooter(): Observable<string> {
    return this.http.get(`/api/asset/footer`, {responseType: 'text'});
  }

}
