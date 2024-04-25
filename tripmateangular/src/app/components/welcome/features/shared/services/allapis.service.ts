import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AllapisService {
  url:string=environment.baseUrl;
  constructor(private http: HttpClient) {}

  private getHttpHeaders() {
    return new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
  }

  getFlights(){
    return this.http.get<any>(`${this.url}/vuelos`);
  }
  getActivities(){
    return this.http.get<any>(`${this.url}/actividades`);
  }
  getRestaurants() {
    return this.http.get<any>(`${this.url}/restaurantes`, {
      headers: this.getHttpHeaders()
    });
  }
}
