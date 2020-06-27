import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MemberModel, PaymentLog } from './member.model';
import { of, Observable } from 'rxjs';
import { TierPaymentLookUp, PaymentLookUp } from './paymentLookUps.model';
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
    private $paymentList;
    // private $tierPaymentLookups;
    private baseUrl = environment.apiUrl;

    // paymentInformationByYear(year): void {
    //   this.$paymentList = of([]);
    //   if (year === "2020") {
    //     this.paymentList = [{
    //       memberId: 1,
    //       churchId: 'MOECD-1',
    //       firstName: 'Daniel',
    //       middleName: 'Tesfay',
    //       lastName: 'Kifle',
    //       registrationDate: new Date('2019-03-01'),
    //       unpaidMonths: 12,
    //       tier:1,
    //       homePhoneNo: '6419198902',
    //       paymentLogs:[{
    //         paymentLogId:null,
    //         year:2020,
    //         month:1,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:2,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:3,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:4,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:5,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:6,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:7,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:8,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:9,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:10,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:11,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:12,
    //         amount:25
    //       }
    
    //     ],
    //     },
    //     {
    //       memberId: 2,
    //       churchId: 'MOECD-2',
    //       firstName: 'Robel',
    //       middleName: 'G',
    //       lastName: 'Woldu',
    //       tier:1,
    //       homePhoneNo: '2133529858',
    //       registrationDate: new Date('2018-03-01'),
    //       unpaidMonths: 12,
    //       paymentLogs:[{
    //         paymentLogId:null,
    //         year:2020,
    //         month:1,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:2,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:3,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:4,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:5,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:6,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:7,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:8,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:9,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:10,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:11,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:12,
    //         amount:25
    //       }
    
    //     ],
    //     },
    //     {
    //       memberId: 3,
    //       churchId: 'MOECD-3',
    //       firstName: 'Yodit',
    //       middleName: 'G',
    //       lastName: 'Kifle',
    //       registrationDate: new Date('2019-05-01'),
    //       unpaidMonths: 12,
    //       tier:3,
    //       homePhoneNo: '6419194444',
    //       paymentLogs:[{
    //         paymentLogId:null,
    //         year:2020,
    //         month:1,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:2,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:3,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:4,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:5,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:6,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:7,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:8,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:9,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:10,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:11,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2020,
    //         month:12,
    //         amount:25
    //       }
    //     ]
    //     }
    //   ];
    //   this.$paymentList=of(this.paymentList);
    //   }
    //   else if (year === "2019") {
    //     this.paymentList = [{
    //       memberId: 1,
    //       churchId: 'MOECD-1',
    //       firstName: 'Daniel',
    //       middleName: 'Tesfay',
    //       lastName: 'Kifle',
    //       registrationDate: new Date('2019-03-01'),
    //       unpaidMonths: 9,
    //       tier:1,
    //       homePhoneNo: '6419198902',
    //       paymentLogs:[{
    //         paymentLogId:null,
    //         year:2019,
    //         month:1,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:2,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:9,
    //         year:2019,
    //         month:3,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:4,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:5,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:6,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:7,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:8,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:9,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:10,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:11,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:12,
    //         amount:25
    //       }
    
    //     ],
    //     },
    //     {
    //       memberId: 2,
    //       churchId: 'MOECD-2',
    //       firstName: 'Robel',
    //       middleName: 'G',
    //       lastName: 'Woldu',
    //       tier:1,
    //       homePhoneNo: '2133529858',
    //       registrationDate: new Date('2018-03-01'),
    //       unpaidMonths: 7,
    //       paymentLogs:[{
    //         paymentLogId:1,
    //         year:2019,
    //         month:1,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:5,
    //         year:2019,
    //         month:2,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:9,
    //         year:2019,
    //         month:3,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:13,
    //         year:2019,
    //         month:4,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:17,
    //         year:2019,
    //         month:5,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:6,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:7,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:8,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:9,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:10,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:11,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:12,
    //         amount:25
    //       }
    
    //     ],
    //     },
    //     {
    //       memberId: 3,
    //       churchId: 'MOECD-3',
    //       firstName: 'Yodit',
    //       middleName: 'G',
    //       lastName: 'Kifle',
    //       registrationDate: new Date('2019-05-01'),
    //       unpaidMonths: 3,
    //       tier:3,
    //       homePhoneNo: '6419194444',
    //       paymentLogs:[{
    //         paymentLogId:null,
    //         year:2019,
    //         month:1,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:2,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:3,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:4,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:23,
    //         year:2019,
    //         month:5,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:27,
    //         year:2019,
    //         month:6,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:31,
    //         year:2019,
    //         month:7,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:35,
    //         year:2019,
    //         month:8,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:39,
    //         year:2019,
    //         month:9,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:10,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:11,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2019,
    //         month:12,
    //         amount:25
    //       }
    //     ]
    //     }
    //   ];
    //   this.$paymentList=of(this.paymentList);
    //   }
    //   else if (year === "2018") {
    //     this.paymentList = [
    //     {
    //       memberId: 2,
    //       churchId: 'MOECD-2',
    //       firstName: 'Robel',
    //       middleName: 'G',
    //       lastName: 'Woldu',
    //       tier:1,
    //       homePhoneNo: '2133529858',
    //       registrationDate: new Date('2018-03-01'),
    //       unpaidMonths: 0,
    //       paymentLogs:[{
    //         paymentLogId:null,
    //         year:2018,
    //         month:1,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:null,
    //         year:2018,
    //         month:2,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:9,
    //         year:2018,
    //         month:3,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:13,
    //         year:2018,
    //         month:4,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:17,
    //         year:2018,
    //         month:5,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:21,
    //         year:2018,
    //         month:6,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:25,
    //         year:2018,
    //         month:7,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:29,
    //         year:2018,
    //         month:8,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:34,
    //         year:2018,
    //         month:9,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:39,
    //         year:2018,
    //         month:10,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:43,
    //         year:2018,
    //         month:11,
    //         amount:25
    //       },
    //       {
    //         paymentLogId:47,
    //         year:2018,
    //         month:12,
    //         amount:25
    //       }
    
    //     ]
    //     }
    //   ];
    //   this.$paymentList=of(this.paymentList);
    //   }
    // }

  getPaymentList(year): Observable<MemberModel[]> {
    // this.paymentInformationByYear(year);
    // return this.$paymentList;
    const headers = this.getHttpHeaders();
    return this.httpClient.get<MemberModel[]>(`${this.baseUrl}getallpayment/` + year, {headers});
  }

  unpaidPreviousYearPaymentExist(memberId: number, paymentStartYear: number, year: number) {
    const headers = this.getHttpHeaders();
    return this.httpClient.get<boolean>(`${this.baseUrl}previousYearPaymentExist?memberId=` + memberId + '&paymentStartYear=' + paymentStartYear + '&year=' + year, {headers});
  }

  addPayment(paymentRequest: Paymentrequest): Observable<PaymentResponse> {
    console.log('inside add payment');
    const headers = this.getHttpHeaders();
    return this.httpClient.post<PaymentResponse>(`${this.baseUrl}pay`, paymentRequest, {headers});
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

  // getPaymentLookUps(tierId: number): Observable<PaymentLookUp[]> {

  //    //return this.httpClient.get<TierPaymentLookUp[]>('put url here');
  //    let result: PaymentLookUp[] = [];
  //    let keepGoing = true;
  //   tierPaymentLookUps.forEach(element => {
  //       if(keepGoing){
  //         if(element.tierId==tierId){
  //           result=element.paymentLookUps;
  //           keepGoing=false;
  //         }
  //       }
        
  //     });
  //     return of(result);   
  // }

  // postPayment(paymentPayLoad:PaymentPayLoad){
  postPayment(paymentPayLoad) {
    this.paymentList.forEach(element => {
      if(element.memberId === paymentPayLoad.memberId) {
        for (let i = 0; i < paymentPayLoad.paymentLogs.length; i++) {
          element.paymentLogs[paymentPayLoad.payStartMonth + i].paymentLogId = paymentPayLoad.paymentLogs[i].paymentLookupId;
        }
      }
    });
    this.$paymentList = of(this.paymentList);
    console.log('$$$$$$$$$', this.$paymentList);
  } 
 }

//  let tierPaymentLookUps = [
//   {
//       tierId: 1,
//       paymentLookUps : [
//           { paymentLookupId: 1, month: 1, year: 2019, amount: 10 },
//           { paymentLookupId: 5, month: 2, year: 2019, amount: 10 },
//           { paymentLookupId: 9, month: 3, year: 2019, amount: 10 },
//           { paymentLookupId: 13, month: 4, year: 2019, amount: 10 },
//           { paymentLookupId: 17, month: 5, year: 2019, amount: 10 },
//           { paymentLookupId: 21, month: 6, year: 2019, amount: 10 },
//           { paymentLookupId: 25, month: 7, year: 2019, amount: 10 },
//           { paymentLookupId: 29, month: 8, year: 2019, amount: 10 },
//           { paymentLookupId: 33, month: 9, year: 2019, amount: 10 },
//           { paymentLookupId: 37, month: 10, year: 2019, amount: 10 },
//           { paymentLookupId: 41, month: 11, year: 2019, amount: 10 },
//           { paymentLookupId: 45, month: 12, year: 2019, amount: 10 }
//       ]
//   },
//   {
//       tierId: 2,
//       paymentLookUps : [
//           { paymentLookupId: 2, month: 1, year: 2019, amount: 15 },
//           { paymentLookupId: 6, month: 2, year: 2019, amount: 15 },
//           { paymentLookupId: 10, month: 3, year: 2019, amount: 15 },
//           { paymentLookupId: 14, month: 4, year: 2019, amount: 15 },
//           { paymentLookupId: 18, month: 5, year: 2019, amount: 15 },
//           { paymentLookupId: 22, month: 6, year: 2019, amount: 15 },
//           { paymentLookupId: 26, month: 7, year: 2019, amount: 15 },
//           { paymentLookupId: 30, month: 8, year: 2019, amount: 15 },
//           { paymentLookupId: 34, month: 9, year: 2019, amount: 15 },
//           { paymentLookupId: 38, month: 10, year: 2019, amount: 15 },
//           { paymentLookupId: 42, month: 11, year: 2019, amount: 15 },
//           { paymentLookupId: 46, month: 12, year: 2019, amount: 15 }
//       ]
//   },
//   {
//       tierId: 3,
//       paymentLookUps : [
//           { paymentLookupId: 3, month: 1, year: 2019, amount: 20 },
//           { paymentLookupId: 7, month: 2, year: 2019, amount: 25 },
//           { paymentLookupId: 11, month: 3, year: 2019, amount: 25 },
//           { paymentLookupId: 15, month: 4, year: 2019, amount: 25 },
//           { paymentLookupId: 19, month: 5, year: 2019, amount: 25 },
//           { paymentLookupId: 23, month: 6, year: 2019, amount: 25 },
//           { paymentLookupId: 27, month: 7, year: 2019, amount: 25 },
//           { paymentLookupId: 31, month: 8, year: 2019, amount: 25 },
//           { paymentLookupId: 35, month: 9, year: 2019, amount: 30 },
//           { paymentLookupId: 39, month: 10, year: 2019, amount: 25 },
//           { paymentLookupId: 43, month: 11, year: 2019, amount: 25 },
//           { paymentLookupId: 47, month: 12, year: 2019, amount: 25 }
//       ]
//   },
//   {
//       tierId: 4,
//       paymentLookUps : [
//           { paymentLookupId: 4, month: 1, year: 2019, amount: 25 },
//           { paymentLookupId: 8, month: 2, year: 2019, amount: 25 },
//           { paymentLookupId: 12, month: 3, year: 2019, amount: 25 },
//           { paymentLookupId: 16, month: 4, year: 2019, amount: 25 },
//           { paymentLookupId: 20, month: 5, year: 2019, amount: 30 },
//           { paymentLookupId: 24, month: 6, year: 2019, amount: 30 },
//           { paymentLookupId: 28, month: 7, year: 2019, amount: 30 },
//           { paymentLookupId: 32, month: 8, year: 2019, amount: 30 },
//           { paymentLookupId: 36, month: 9, year: 2019, amount: 30 },
//           { paymentLookupId: 40, month: 10, year: 2019, amount: 30 },
//           { paymentLookupId: 44, month: 11, year: 2019, amount: 30 },
//           { paymentLookupId: 48, month: 12, year: 2019, amount: 30 }
//       ]
//   }
// ]