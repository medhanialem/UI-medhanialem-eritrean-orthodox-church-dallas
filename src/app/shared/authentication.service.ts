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
  resetPasswordForm: ResetPasswordForm;
  forgotPasswordForm: PasswordResetRequestModel;

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

  forgotPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.forgotPasswordForm = {email};
    return this.httpClient.post(`${this.baseUrl}users/password-reset-request`, this.forgotPasswordForm, {headers});
  }

  resetPassword(urlToken: string, passWord: string, confirmPassWord: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.resetPasswordForm = {token: urlToken, password: passWord, confirmPassword: confirmPassWord};
    console.log(this.resetPasswordForm);
    return this.httpClient.post(`${this.baseUrl}api/auth/resetPassword?token=` + urlToken, this.resetPasswordForm, {headers});
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

export class ResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

export class PasswordResetRequestModel {
  email: string;
}
