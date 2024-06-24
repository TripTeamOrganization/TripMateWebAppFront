import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.baseUrl;
  REGISTER_URL = `${(this.BASE_URL)}/authentication/sign-up`;
  LOGIN_URL = `${(this.BASE_URL)}/authentication/sign-in`;
  private tokenKey = 'authToken';
  constructor(private httpClient: HttpClient, private router:Router) {

  }
  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.REGISTER_URL, {username, password});
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, {username, password}).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token)
          this.setToken(response.token);
        }
      })
    );
  }

  private setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logOut(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/signin']);
  }

}
