import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Prediction } from '../models/Prediction.model';

/**
 * Servicio de alertas
 */
@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  #endpoint: string = environment.baseUrl + '/prediction';

  constructor(private _http: HttpClient) {}

  getPrediction(id: string, unit: string): Observable<Prediction> {
    return this._http.get<Prediction>(`${this.#endpoint}/${id}?temperature_unit=${unit}`);
  }
}
