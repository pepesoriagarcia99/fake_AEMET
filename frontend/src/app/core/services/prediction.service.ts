import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Servicio de alertas
 */
@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  #endpoint: string = environment.baseUrl + "/prediction";

  constructor(private _http: HttpClient) {}

}