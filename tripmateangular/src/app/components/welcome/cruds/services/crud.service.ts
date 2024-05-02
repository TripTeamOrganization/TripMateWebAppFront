import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,throwError,Observable,retry } from 'rxjs';
import {Accommodation} from "../../../../models/accomodation.model";
import {Flight} from "../../../../models/flight.model";
import {Activity} from "../../../../models/activity.model";
import {Restaurant} from "../../../../models/restaurant.model";
import {environment} from "../../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  httpOptions = {

    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })

  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ${error.status}, body was: ${error.error}'
      );
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  //Funciones Accomodation

  createAccommodation(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.url + '/alojamientos', data, httpOptions);
  }

  getAccomodations(): Observable<Accommodation> {
    return this.http.get<Accommodation>(this.url + '/alojamientos')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateAccomodation(id: string, newData: any): Observable<any> {
    const url = `${this.url + '/alojamientos'}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(url, newData, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error updating accommodation:', error);
          throw error; // Reenviar el error para que sea manejado por el componente
        })
      );
  }

  deleteAccomodation(id: any): Observable<Accommodation> {
    return this.http.delete<Accommodation>(this.url + '/alojamientos/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  //Funciones Flights

  createFlights(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.url + '/vuelos', data, httpOptions);
  }

  getFlights(): Observable<Flight> {
    return this.http.get<Flight>(this.url + '/vuelos')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateFlights(id: string, newData: any): Observable<any> {
    const url = `${this.url + '/vuelos'}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(url, newData, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error updating:', error);
          throw error;
        })
      );
  }

  deleteFlights(id: any): Observable<Accommodation> {
    return this.http.delete<Accommodation>(this.url + '/vuelos/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //Funciones Activity

  createActivity(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.url + '/actividades', data, httpOptions);
  }

  getActivity(): Observable<Activity> {
    return this.http.get<Activity>(this.url + '/actividades')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateActivity(id: string, newData: any): Observable<any> {
    const url = `${this.url + 'actividades'}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(url, newData, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error updating :', error);
          throw error;
        })
      );
  }

  deleteActivity(id: any): Observable<Activity> {
    return this.http.delete<Activity>(this.url + '/actividades/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //Funciones Restaurants

  createRestaurants(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.url + '/restaurantes', data, httpOptions);
  }

  getRestaurants(): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + '/restaurantes')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateRestaurants(id: string, newData: any): Observable<any> {
    const url = `${this.url + 'restaurantes'}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(url, newData, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error updating :', error);
          throw error;
        })
      );
  }

  deleteRestaurants(id: any): Observable<Restaurant> {
    return this.http.delete<Restaurant>(this.url + '/restaurantes/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
