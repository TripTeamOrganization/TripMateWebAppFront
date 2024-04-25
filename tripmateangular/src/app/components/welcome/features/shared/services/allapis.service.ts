import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AllapisService {
  url:string=environment.baseUrl;
  constructor(private http: HttpClient) {

  }
  getFlights(){
    return this.http.get<any>(`${this.url}/vuelos`);
  }
  getActivities(){
    return this.http.get<any>(`${this.url}/actividades`);
  }
}
