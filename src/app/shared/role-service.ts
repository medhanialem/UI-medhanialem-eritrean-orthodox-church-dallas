import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from './role';

@Injectable({ providedIn: 'root' })
export class RoleService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getAllRoles(): Observable<Role[]> {
    const headers = this.getHttpHeaders();
    return this.httpClient.get<Role[]>(`${this.baseUrl}roles`, {headers});
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

}
