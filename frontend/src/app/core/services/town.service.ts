import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Servicio de alertas
 */
@Injectable({
  providedIn: 'root'
})
export class TownService {
  #endpoint: string = environment.baseUrl + "/towns";

  constructor(private _http: HttpClient) {}

}
