import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('check if login work', () => {
      const loginTest = {email: 'test', password: '0000' };
      service.login(loginTest).subscribe(response => {
        expect(response.access_token).not.toBeNull();
        expect(service.loggedIn).toBe(true);
        expect(service.getToken()).not.toBeNull();
      });
  });

  it('check if bad login', () => {
    const loginTest = {email: 'badlogin', password: '12346' };
    service.login(loginTest).subscribe(response => {
      expect(response.access_token).toBeNull();
      expect(service.loggedIn).toBe(false);
      expect(service.getToken()).toBeNull();
    });
  });

  it('check if logout work', () => {
    service.logout();
    expect(service.loggedIn).toBe(false);
    expect(service.getToken()).toBeNull();
  });
});
