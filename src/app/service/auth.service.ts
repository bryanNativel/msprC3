import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../interface/user';
import {Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  login(user: User) {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', user).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }), catchError(this.handleError));
  }

  register(user: User) {
    return this.http.post<{ access_token: string }>('url', user).pipe(tap(res => {
      this.router.navigate(['login']);
    }), catchError(this.handleError));
  }

  logout() {
    const checkRemouveToker = localStorage.removeItem('access_token');
    if (checkRemouveToker == null) {
      this.router.navigate(['login']);
    }
  }

  get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
  // GetProfilUser
  getUserProfile(id): Observable<any> {
    return this.http.get('url/id', { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
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


}
