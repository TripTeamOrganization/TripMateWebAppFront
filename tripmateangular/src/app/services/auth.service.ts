import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {setPostSignalSetFn} from "@angular/core/primitives/signals";

@Injectable({
providedIn: 'root'
})
export class AuthService {
  BASE_URL = environment.baseUrl;
  REGISTER_URL = `${(this.BASE_URL)}/authentication/sign-up`;
  LOGIN_URL = `${(this.BASE_URL)}/authentication/sign-in`;
  private tokenKey = 'authToken';
  private userKey='userID';
  private userKeySubject = new BehaviorSubject<string | null>(this.getUserIDofSTORAGE());

  constructor(private httpClient: HttpClient, private router:Router) {

  }
  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.REGISTER_URL, {username, password});
  }
  sendUserIDtoSTORAGE(userKey: string){
    sessionStorage.setItem(this.userKey, userKey);
    this.userKeySubject.next(userKey);

  }
  getUserKeyChanges(): Observable<string | null> {
    return this.userKeySubject.asObservable();
  }
  getUserIDofSTORAGE() {
    if (this.isSessionStorageAvailable() && sessionStorage.getItem(this.userKey)) {
      return sessionStorage.getItem(this.userKey);
    } else {
      return null;
    }
  }
  private isSessionStorageAvailable(): boolean {
    return typeof sessionStorage !== 'undefined';
  }
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, {username, password}).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token)
          this.sendUserIDtoSTORAGE(username);
          this.setToken(response.token);
        }
        const userId = Number(response.id);
        sessionStorage.setItem('id', userId.toString());
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
    sessionStorage.removeItem(this.userKey);
    this.router.navigate(['/signin']).then(() => {
      window.location.reload();
    });
  }

}
