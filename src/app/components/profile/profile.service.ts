import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangePassword } from './changepassword/changepsw-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = environment.apiUrl;

  constructor(
      private authService: AuthenticationService,
      private httpClient: HttpClient) {
  }

  changePassword(changePassword: ChangePassword): Observable<number> {
    const headers = this.getHttpHeaders();
    return this.httpClient.post<number>(`${this.baseUrl}users/user/updatePassword`, changePassword, {headers});
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }
}
