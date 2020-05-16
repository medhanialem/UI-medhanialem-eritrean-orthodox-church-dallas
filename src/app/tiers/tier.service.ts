import { Injectable } from '@angular/core';
import { TierModel } from './tier.model';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TierService {

  private baseUrl = environment.apiUrl;

  constructor(
      private authService: AuthenticationService,
      private httpClient: HttpClient) {
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

  public getTierList(): Observable<TierModel[]> {
    const headers = this.getHttpHeaders();
    return this.httpClient.get<TierModel[]>(`${this.baseUrl}tiers`, {headers});
  }

  addTier(tier: TierModel, action: string): Observable<TierModel> {
    const headers = this.getHttpHeaders();
    if (null != action && action.toLowerCase() === 'save') {
      return this.httpClient.post<TierModel>(`${this.baseUrl}tiers`, tier, {headers});
    } else if (null != action && action.toLowerCase() === 'update') {
      const id = tier.id;
      return this.httpClient.put<TierModel>(`${this.baseUrl}tiers/` + id, tier, {headers});
    }
  }

  deleteTier(id1: number) {
    const headers = this.getHttpHeaders();
    console.log(`${this.baseUrl}tiers/` + id1);
    this.httpClient.delete(`${this.baseUrl}tiers/` + id1, {headers});
  }

}
