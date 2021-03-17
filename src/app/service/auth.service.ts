import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken():string{
    return localStorage.getItem('access_token')
  }

  login(user: User){
    return this.http.post<{ access_token: string }>('url', user).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }));
  }

  register(user: User) {
    return this.http.post<{ access_token: string }>('url', user).pipe(tap(res => {
      this.router.navigate(['login']);
    }));
  }

  logout() {
    let checkRemouveToker = localStorage.removeItem('access_token');
    if (checkRemouveToker == null) {
      this.router.navigate(['login']);
    }

  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }


}
