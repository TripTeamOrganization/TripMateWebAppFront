import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable, retry } from 'rxjs';
import { Accommodation } from "../../../../models/accomodation.model";
import { Flight } from "../../../../models/flight.model";
import { Activity } from "../../../../models/activity.model";
import { Restaurant } from "../../../../models/restaurant.model";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.status}, body was: ${error.error}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Functions for Accommodation

  createAccommodation(data: Accommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>(this.url + '/accommodations', data, this.httpOptions);
  }

  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.url + '/accommodations')
      .pipe(retry(2), catchError(this.handleError));
  }

  updateAccommodation(id: number, newData: Accommodation): Observable<Accommodation> {
    const url = `${this.url + '/accommodations'}/${id}`;
    return this.http.put<Accommodation>(url, newData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteAccommodation(id: number): Observable<{}> {
    return this.http.delete(`${this.url + '/accommodations'}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Functions for Flights

  createFlight(data: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.url + '/flights', data, this.httpOptions);
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.url + '/flights')
      .pipe(retry(2), catchError(this.handleError));
  }

  updateFlight(id: number, newData: Flight): Observable<Flight> {
    const url = `${this.url + '/flights'}/${id}`;
    return this.http.put<Flight>(url, newData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteFlight(id: number): Observable<{}> {
    return this.http.delete(`${this.url + '/flights'}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Functions for Activities

  createActivity(data: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.url + '/activities', data, this.httpOptions);
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.url + '/activities')
      .pipe(retry(2), catchError(this.handleError));
  }

  updateActivity(id: number, newData: Activity): Observable<Activity> {
    const url = `${this.url + '/activities'}/${id}`;
    return this.http.put<Activity>(url, newData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteActivity(id: number): Observable<{}> {
    return this.http.delete(`${this.url + '/activities'}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Functions for Restaurants

  createRestaurant(data: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.url + '/restaurants', data, this.httpOptions);
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/restaurants')
      .pipe(retry(2), catchError(this.handleError));
  }

  updateRestaurant(id: number, newData: Restaurant): Observable<Restaurant> {
    const url = `${this.url + '/restaurants'}/${id}`;
    return this.http.put<Restaurant>(url, newData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteRestaurant(id: number): Observable<{}> {
    return this.http.delete(`${this.url + '/restaurants'}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
