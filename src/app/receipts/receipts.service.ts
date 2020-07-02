import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MembershipReceiptHistory } from './membership.receipt.history';

@Injectable({ providedIn: 'root' })
export class ReceiptsService {

  private baseUrl = environment.apiUrl;

  constructor(
      private authService: AuthenticationService,
      private httpClient: HttpClient) {
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

  public getReceipts(year: number, searchCriteria: string): Observable<MembershipReceiptHistory[]> {
    if (searchCriteria.trim() === '') {
      searchCriteria = '*all*';
    }
    const headers = this.getHttpHeaders();
    return this.httpClient.get<MembershipReceiptHistory[]>(`${this.baseUrl}monthlyPayment/getReceipts/` + year + '/' + searchCriteria, {headers});
  }

  public refundMonthlyPayment(receiptId: number): Observable<PaymentResponse> {
    const headers = this.getHttpHeaders();
    return this.httpClient.post<PaymentResponse>(`${this.baseUrl}monthlyPayment/refund/` + receiptId, {headers});
  }

}
