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

  createAccomodation(item: any): Observable<Accommodation> {
    // Realiza la solicitud POST al servidor
    return this.http.post<Accommodation>(this.url + '/alojamientos', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2), // Intenta la solicitud hasta 2 veces en caso de error
        catchError(this.handleError) // Maneja los errores de la solicitud
      );
  }

  getAccomodations(): Observable<Accommodation>{

    return this.http.
    get<Accommodation>(this.url + '/alojamientos')
      .pipe(retry(2), catchError(this.handleError));
  }

  updateAccomodation(id: string, item: any): Observable<Accommodation>{
    return this.http.
    put<Accommodation>(this.url + '/alojamientos' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteAccomodation(id: any): Observable<Accommodation> {
    console.log(this.url + '/' + id)
    console.log(id)
    return this.http
      .delete<Accommodation>(this.url + '/alojamientos' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Funciones Flights

  createFlight(item: any): Observable<Flight> {
    // Realiza la solicitud POST al servidor
    return this.http.post<Flight>(this.url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2), // Intenta la solicitud hasta 2 veces en caso de error
        catchError(this.handleError) // Maneja los errores de la solicitud
      );
  }

  getFlight(): Observable<Flight>{

    return this.http.
    get<Flight>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateFlight(id: string, item: any): Observable<Flight>{
    return this.http.
    put<Flight>(this.url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteFlight(id: any): Observable<Flight> {
    console.log(this.url + '/' + id)
    console.log(id)
    return this.http
      .delete<Flight>(this.url + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Funciones Activity

  createActivity(item: any): Observable<Activity> {
    // Realiza la solicitud POST al servidor
    return this.http.post<Activity>(this.url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2), // Intenta la solicitud hasta 2 veces en caso de error
        catchError(this.handleError) // Maneja los errores de la solicitud
      );
  }

  getActivity(): Observable<Activity>{

    return this.http.
    get<Activity>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateActivity(id: string, item: any): Observable<Activity>{
    return this.http.
    put<Activity>(this.url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteActivity(id: any): Observable<Activity> {
    console.log(this.url + '/' + id)
    console.log(id)
    return this.http
      .delete<Activity>(this.url + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Funciones Restaurants

  createRestaurants(item: any): Observable<Restaurant> {
    // Realiza la solicitud POST al servidor
    return this.http.post<Restaurant>(this.url, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2), // Intenta la solicitud hasta 2 veces en caso de error
        catchError(this.handleError) // Maneja los errores de la solicitud
      );
  }

  getRestaurants(): Observable<Restaurant>{

    return this.http.
    get<Restaurant>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateRestaurants(id: string, item: any): Observable<Restaurant>{
    return this.http.
    put<Restaurant>(this.url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteRestaurants(id: any): Observable<Restaurant> {
    console.log(this.url + '/' + id)
    console.log(id)
    return this.http
      .delete<Restaurant>(this.url + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


}
