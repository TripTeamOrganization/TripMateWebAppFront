import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";

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
    return this.http.get<any>(`${this.url}/flights`);
  }

  getActivities(){
    return this.http.get<any>(`${this.url}/activities`);
  }

  getRestaurants() {
    return this.http.get<any>(`${this.url}/restaurants`);
  }

  getAccomodations(){
    return this.http.get<any>(`${this.url}/accommodations`);
  }

  getNotifications(){
    return this.http.get<any>(`${this.url}/Notifications`);
  }

  getUser() {
    const userId = sessionStorage.getItem('id');
    return this.http.get<any>(`${this.url}/users/${userId}`);
  }

  updatePassword(userId: string | number, newPassword: string | null): Observable<User> {
    const payload = { password: newPassword };
    return this.http.put<User>(`${this.url}/users/${userId}`, payload, this.httpOptions);
  }

  updateEmail(userId: string, newEmail: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/users/${userId}`, { email: newEmail }, { headers });
  }
}
