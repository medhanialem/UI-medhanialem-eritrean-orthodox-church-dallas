import { Injectable } from '@angular/core';
import { MemberModel } from './member.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paymentrequest } from './paymentrequest';
import { PaymentResponse } from './payment-response';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    constructor(private httpClient: HttpClient) { }
    paymentList: Array<MemberModel>;
    private baseUrl = environment.apiUrl;

  getPaymentList(year): Observable<MemberModel[]> {
    const headers = this.getHttpHeaders();
    return this.httpClient.get<MemberModel[]>(`${this.baseUrl}monthlyPayment/getallpayment/` + year, {headers});
  }

  unpaidPreviousYearPaymentExist(memberId: number, paymentStartYear: number, year: number) {
    const headers = this.getHttpHeaders();
    return this.httpClient.get<boolean>(`${this.baseUrl}monthlyPayment/previousYearPaymentExist?memberId=`
      + memberId + '&paymentStartYear=' + paymentStartYear + '&year=' + year, {headers});
  }

  addPayment(paymentRequest: Paymentrequest): Observable<PaymentResponse> {
    const headers = this.getHttpHeaders();
    return this.httpClient.post<PaymentResponse>(`${this.baseUrl}monthlyPayment/pay`, paymentRequest, {headers});
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

}
