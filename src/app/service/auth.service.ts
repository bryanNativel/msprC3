import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl = environment.apiUrl;
  private apiLoginEndpoint = 'auth/login';
  private apiRegisterEndpoitn = 'auth/register';

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  authenticationHeader(token: string) {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(user: { name: string; email: string; password: string }) {
    return this.http
      .post<{ access_token: string }>(
        `${this.apiUrl}/${this.apiLoginEndpoint}`,
        { username: user.email, password: user.password }
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
          //localStorage.setItem('user_id', `${res.user_id}`);
        }),
        catchError(this.handleError)
      );
  }

  register(user: User) {
    return this.http
      .post<{ access_token: string }>(
        `${this.apiUrl}/${this.apiRegisterEndpoitn}`,
        user
      )
      .pipe(
        tap((res) => {}),
        catchError(this.handleError)
      );
  }

  logout() {
    try {
      this.cleanLocalStorage();
    } finally {
      this.router.navigate(['login']);
    }
  }

  cleanLocalStorage() {
    try {
      //localStorage.removeItem('user_id');
      localStorage.removeItem('access_token');
    } catch (e) {
      throw new Error(
        `Error while trying to clear local storage. message : ${e.message}`
      );
    }
  }

  get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  getUserId(): number {
    return +localStorage.getItem('user_id');
  }
}
