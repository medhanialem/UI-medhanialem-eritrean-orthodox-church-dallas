import { Injectable } from '@angular/core';
import { DecodedToken } from './DecodedToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token =
// tslint:disable-next-line: max-line-length
'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZGlzcGxheV9uYW1lIjoiTWVkaGFuaWUgQWxlbSIsImVtYWlsIjoidGVzdC51c2VyQHRlc3QuY29tIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTc4NzYzMjk0LCJleHAiOjE3Nzg4NDk2OTUsImlhdCI6MTU3ODc2MzI5NH0.wl3EvA0J3CVD9IejYJRRsBNhzCZxqoKt369FVlCvvWtoMq1aVYHCgJ5sXTPnJhs2QTbosQGSpQDsyEayxyfmFg';
jwtHelper = new JwtHelperService();
constructor(private router: Router, private httpClient: HttpClient) { }

  decodedToken(): DecodedToken {

  const token = localStorage.getItem('token');
  if (this.jwtHelper.isTokenExpired(token)) {
    return null;
  } else {
    return this.jwtHelper.decodeToken(token);
  }
}

isAuthenticated(): boolean {
  return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
}



signIn(userName: string, password: string): boolean {
  // SN: Remember to replace this with an api call
  if (userName === 'Hazeka@test.com' && password === 'Major') {
    localStorage.setItem('token', this.token);
    return true;
  } else {
    return false;
  }
}

logout() {
  localStorage.clear();
  this.router.navigate(['/', 'login']);
}
}
