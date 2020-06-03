import { Injectable } from '@angular/core';
import { LookupModel } from './lookups.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LookupsService {

  private baseUrl = environment.apiUrl;

  constructor(
      private authService: AuthenticationService,
      private httpClient: HttpClient) {
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

  public getLookUpList(tierId: number, year: number) {
    const headers = this.getHttpHeaders();
    return this.httpClient.get<LookupModel[]>(`${this.baseUrl}paymentlookups?tierId=` + tierId + '&year=' + year, {headers});
  }

  addLookUps(lookUps: LookupModel[], tierId: number, action: string): Observable<LookupModel[]> {
    const headers = this.getHttpHeaders();
    if (null != action && action.toLowerCase() === 'save') {
      return this.httpClient.post<LookupModel[]>(`${this.baseUrl}paymentlookups?tierId=` + tierId, lookUps, {headers});
    } else if (null != action && action.toLowerCase() === 'update') {
      return this.httpClient.put<LookupModel[]>(`${this.baseUrl}paymentlookups`, lookUps, {headers});
    }

    return null;
  }

}
