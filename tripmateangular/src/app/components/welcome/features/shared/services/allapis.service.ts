import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AllapisService {
  url:string=environment.baseUrl;
  constructor(private http: HttpClient) {}

  getFlights(){
    return this.http.get<any>(`${this.url}/vuelos`); ///linea importante para la conexion exterior
  }

  getActivities(){
    return this.http.get<any>(`${this.url}/actividades`);
  }

  getRestaurants() {
    return this.http.get<any>(`${this.url}/restaurantes`);
  }

  getAccomodations(){
    return this.http.get<any>(`${this.url}/alojamientos`);
  }
  getMyJourneys(){
    return this.http.get<any>(`${this.url}/myjourneys`);
  }
}
