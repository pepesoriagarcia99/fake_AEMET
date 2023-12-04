import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Town } from '../models/Town.model';
import { Observable } from 'rxjs';

/**
 * Servicio de alertas
 */
@Injectable({
  providedIn: 'root',
})
export class TownService {
  #endpoint: string = environment.baseUrl + '/towns';

  constructor(private _http: HttpClient) {}

  getTown(name: string): Observable<Town[]> {
    return this._http.get<Town[]>(`${this.#endpoint}?name=${name}`);
  }
}
