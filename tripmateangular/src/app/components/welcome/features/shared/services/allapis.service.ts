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
      'ngrok-skip-browser-warning': '69420' //importante
    });
  }

  getFlights(){
    return this.http.get<any>(`${this.url}/vuelos`,{
    headers: this.getHttpHeaders() })//linea importante para la conexion exterior

  };
  getActivities(){
    return this.http.get<any>(`${this.url}/actividades`,{
    headers: this.getHttpHeaders()})//linea importante para la conexion exterior

  };
  getRestaurants() {
    return this.http.get<any>(`${this.url}/restaurantes`, {
      headers: this.getHttpHeaders() //linea importante para la conexion exterior
    });
  }
  getAccomodations(){
    return this.http.get<any>(`${this.url}/alojamientos`, {
      headers: this.getHttpHeaders()
    })
  }
}
