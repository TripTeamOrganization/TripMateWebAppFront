import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TripmateApiService {
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

  getNotifications(){
    return this.http.get<any>(`${this.url}/Notifications`);
  }

  getUsers() {
    return this.http.get<any>(`${this.url}/users`);
  }

  updateEmail(userId: string, newEmail: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/users/${userId}`, { email: newEmail }, { headers });
  }
}
