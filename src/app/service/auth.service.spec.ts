import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClientModule} from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('check if login work', () => {
      const loginTest = {email: 'test', password: '0000' };
      service.login(loginTest);
      expect(service.loggedIn).toBe(true);
      expect(service.getToken()).not.toBeNull();
  });

  it('check if bad login', () => {
    const loginTest = {email: 'badlogin', password: '12346' };
    service.login(loginTest);
    expect(service.loggedIn).toBe(false);
    expect(service.getToken()).toEqual(null);
  });

  it('check if logout work', () => {
    service.logout();
    expect(service.loggedIn).toBe(false);
  });
});
