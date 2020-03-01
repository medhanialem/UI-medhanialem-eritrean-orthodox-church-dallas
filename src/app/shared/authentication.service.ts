import { Injectable } from '@angular/core';
import { DecodedToken } from './DecodedToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roles } from './roles';
import { IAuthorizationGuard } from './iAuthorization-Guard';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  loginForm: LoginForm;
  loginResponse: any;
  baseUrl = environment.apiUrl;
  private subscriptions: Subscription[] = [];
  loginSucces = false;

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

  signIn(userName: string, passWord: string): boolean {
    this.loginForm = { username: userName, password: passWord };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      //Authorization: localStorage.getItem('token')
    });


    this.subscriptions.push(this.httpClient.post<any>(`${this.baseUrl}api/auth/signin`, this.loginForm, {headers}).subscribe(
      (
        response => {
            this.loginResponse = response;
            localStorage.setItem('token', response.accessToken);
            console.log(response);
            this.loginSucces = true;
        }),
      (
        error => {
          console.log(error.message);
          this.loginSucces = false;
        }),
        () => {
        }

    ));

    return this.loginSucces;
  }

  userHasPermission(authorization: IAuthorizationGuard): boolean {
    return authorization.userHasPermission();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/', 'login']);
  }
}

export class LoginForm {
  username: string;
  password: string;
}