import { Injectable } from '@angular/core';
import { DecodedToken } from './DecodedToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roles } from './roles';
import { IAuthorizationGuard } from './iAuthorization-Guard';
import { environment } from 'src/environments/environment';
import { Subscription, BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  loginForm: LoginForm;
  loginResponse: any;
  baseUrl = environment.apiUrl;
  private subscriptions: Subscription[] = [];
  loginSucces = new BehaviorSubject(false);

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

  signIn(userName: string, password: string): Observable<any> {
    this.loginForm = {username: userName, password};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`${this.baseUrl}api/auth/signin`, this.loginForm, {headers}).
      pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem('token', 'Bearer ' + response.accessToken);
            return true;
          } else {
            return false;
          }
        })
     );
  }

  userHasPermission(authorization: IAuthorizationGuard): boolean {
    return authorization.userHasPermission();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/', 'login']);
  }

  // authorize(userName: string, passWord: string): boolean {
  //   this.loginForm = { username: userName, password: passWord };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });


  //   return this.httpClient.post(`${this.baseUrl}api/auth/signin`, this.loginForm, {headers})
  //   .map(response => response.json());
  // }

}

export class LoginForm {
  username: string;
  password: string;
}