import { Injectable } from '@angular/core';
import { DecodedToken } from './DecodedToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Roles } from './roles';
import { IAuthorizationGuard } from './iAuthorization-Guard';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token =
    // tslint:disable-next-line: max-line-length
    // Sebeka_Gubae
    // 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZGlzcGxheV9uYW1lIjoiTWVkaGFuaWUgQWxlbSIsImVtYWlsIjoidGVzdC51c2VyQHRlc3QuY29tIiwicm9sZSI6IlNlYmVrYV9HdWJhZSIsIm5iZiI6MTU3ODc2MzI5NCwiZXhwIjoxNzc4ODQ5Njk1LCJpYXQiOjE1Nzg3NjMyOTR9.Wjmrl5BehCe9c67O6QDdFs0zhoP4paoIliQjx0phuH6E35XzqUrf_Sxm4XpsQaQfwTgc7-dMFHZivgEEffO4eQ';

    // Admin
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZGlzcGxheV9uYW1lIjoiTWVkaGFuaWUgQWxlbSIsImVtYWlsIjoidGVzdC51c2VyQHRlc3QuY29tIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTc4NzYzMjk0LCJleHAiOjE3Nzg4NDk2OTUsImlhdCI6MTU3ODc2MzI5NH0.wl3EvA0J3CVD9IejYJRRsBNhzCZxqoKt369FVlCvvWtoMq1aVYHCgJ5sXTPnJhs2QTbosQGSpQDsyEayxyfmFg';

    // Sebeka_Gubae,Secretary
    // 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZGlzcGxheV9uYW1lIjoiTWVkaGFuaWUgQWxlbSIsImVtYWlsIjoidGVzdC51c2VyQHRlc3QuY29tIiwicm9sZSI6IlNlYmVrYV9HdWJhZSxTZWNyZXRhcnkiLCJuYmYiOjE1Nzg3NjMyOTQsImV4cCI6MTc3ODg0OTY5NSwiaWF0IjoxNTc4NzYzMjk0fQ.MPSxfOnPnuPea4rjkLB7W-sZ7q2Rs1YWGbh-SUhdMcGLq3qWVAuqRfpVOgFdVLHjYNY9EgV__qVYp0dTfpHyYw';

    // Sebeka_Gubae,Sunday School
    //'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZGlzcGxheV9uYW1lIjoiTWVkaGFuaWUgQWxlbSIsImVtYWlsIjoidGVzdC51c2VyQHRlc3QuY29tIiwicm9sZSI6IlNlYmVrYV9HdWJhZSxTdW5kYXkgU2Nob29sIiwibmJmIjoxNTc4NzYzMjk0LCJleHAiOjE3Nzg4NDk2OTUsImlhdCI6MTU3ODc2MzI5NH0.hrDwhEIH-iipb_uNGNDd5hNlM8cH4g0mg2uNjI4Nq2z0jWDvVB3uYUeQKgmWJ_7wOJqvFBBSfpvtjL0f5HkpnA';

  // Abo Wenber Sebaka Gubae
  //'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZGlzcGxheV9uYW1lIjoiTWVkaGFuaWUgQWxlbSIsImVtYWlsIjoidGVzdC51c2VyQHRlc3QuY29tIiwicm9sZSI6IkFibyBXZW5iZXIgU2ViYWthIEd1YmFlIiwibmJmIjoxNTc4NzYzMjk0LCJleHAiOjE3Nzg4NDk2OTUsImlhdCI6MTU3ODc2MzI5NH0.iPJaqGp3pSEPc2EiPE-N8vTZy798H52SX7eqtmeKf7yNbMZ7v7oxyUNFDFAXOV1ovj__odnAeVMqbx4u-IFYww';
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

  userHasPermission(authorization: IAuthorizationGuard): boolean {
    return authorization.userHasPermission();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/', 'login']);
  }
}
