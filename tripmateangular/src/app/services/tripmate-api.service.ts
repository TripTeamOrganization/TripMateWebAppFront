import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {catchError, Observable, retry} from "rxjs";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";
import {Accommodation} from "../models/accomodation.model";

@Injectable({
  providedIn: 'root'
})
export class TripmateApiService {
  url:string=environment.baseUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {

    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })

  };

  getFlights(){
    return this.http.get<any>(`${this.url}/vuelos`);
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
  updatePassword(userId: string | number, newPassword: string | null): Observable<User> {
    const payload = { password: newPassword };
    return this.http.put<User>(`${this.url}/users/${userId}`, payload, this.httpOptions);
  }
  getUsers() {
    return this.http.get<any>(`${this.url}/users`);
  }

  updateEmail(userId: string, newEmail: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/users/${userId}`, { email: newEmail }, { headers });
  }
}
