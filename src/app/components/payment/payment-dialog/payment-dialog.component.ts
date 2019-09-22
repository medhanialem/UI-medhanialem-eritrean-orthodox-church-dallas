import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaymentLookUp } from '../shared/paymentLookUps.model';
import { PaymentService } from '../shared/payment.service';
import { MemberModel } from '../shared/member.model';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: MemberModel,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private paymentService: PaymentService
  ) { }
  //selecteddata: null;
  fullName: string;
  //months = 1;
  tierValue = 15;
  //total = this.tierValue;
  minimumMonths = 0;
  maximumMonths = 0;
  total = 0;
  index = 0;
  months = 0;
  paymentLogs = [];
  paymentLookUps: PaymentLookUp[];
  startingPay: number = -1;

  ngOnInit() {
    console.log(this.data);
    this.getPaymentLookupData();
    //this.selecteddata=this.data;
    this.fullName = this.data.firstName + " " + this.data.middleName + " " + this.data.lastName;
    this.paymentLogs = this.data.paymentLog;
    this.determineMinimumMaximumMonths();

  }

  getPaymentLookupData() {
    this.paymentService.getPaymentLookUps(this.data.tier).subscribe(
      (response) => {
        if (response != null) {
          this.paymentLookUps = response as PaymentLookUp[];
        }
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        console.log("do something useful");
      }
    )
  }

  dismiss() {
    this.dialogRef.close(null);
  }



  determineMinimumMaximumMonths(): void {

    for (let i = 0; i < this.paymentLogs.length; i++) {
      if (this.paymentLogs[i].paymentLogId == null 
        && this.verifyRegistrationDate(this.paymentLogs[i].month,this.paymentLookUps[i].year)) {
        if (this.startingPay == -1) {
          this.startingPay = i;
          this.index = this.startingPay + 1;
        }
        this.maximumMonths++;
      }
    }
    if (this.maximumMonths >= 1) {
      this.minimumMonths = 1;
      this.months = 1;
      this.total += this.paymentLookUps[this.startingPay].amount;
    }
    else {
      this.months = 0;
    }
  }

  verifyRegistrationDate(month:number,year:number) :boolean{
    let registrationYear = this.data.registrationDate.getFullYear();
    let registrationMonth =this.data.registrationDate.getUTCMonth()+1;
    if(registrationYear<year || (registrationYear===year && registrationMonth<=month)){
      return true;
    }
    return false;

  }

  calculateTotalPlusMonthClicked(): void {

    if (this.months < this.maximumMonths) {
      this.total += this.paymentLookUps[this.index].amount;
      this.index++;
      this.months++;
    }
  }

  calculateTotalMinusMonthClicked(): void {
    if (this.index > this.startingPay) {
      this.months--;
      this.index--;
      this.total -= this.paymentLookUps[this.index].amount;
    }

  }

  makePayment(){
    console.log(`Number of months: ${this.months}, Amount payed: ${this.total}`);
  }
}
