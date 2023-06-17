import {HttpClient, HttpResponse} from "@angular/common/http";
import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Configuration} from "../shared/model/Configuration";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private http = inject(HttpClient);

  /**
   * Retrieves the configuration from the API.
   */
  getConfiguration(): Observable<Configuration> {
    return this.http.get<Configuration>('/api/config');
  }

  /**
   * Saves the configuration to the API.
   * @param configuration The configuration to save.
   */
  saveConfiguration(configuration: Configuration): Observable<HttpResponse<void>> {
    return this.http.patch<void>(`/api/config`, configuration, {observe: 'response'});
  }

  getTitle() {
    return this.http.get('/api/config/title', {responseType: 'text'});
  }

}
