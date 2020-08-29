import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { PaymentLookUp } from '../shared/paymentLookUps.model';
import { PaymentService } from '../shared/payment.service';
import { MemberModel } from '../shared/member.model';
import { PaymentConfirmationComponent } from '../payment-confirmation/payment-confirmation.component';
import { LookupsService } from 'src/app/lookups/lookups.service';
import { Subscription } from 'rxjs';
import { LookupModel } from 'src/app/lookups/lookups.model';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  constructor(
    private lookupsService: LookupsService,
    // @Inject(MAT_DIALOG_DATA) private data: MemberModel,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) { }

  //selecteddata: null;
  fullName: string;
  //months = 1;
  //tierValue = 15;
  //total = this.tierValue;
  minimumMonths = 0;
  maximumMonths = 0;
  total = 0;
  index = 0;
  months = 0;
  paymentLogs = [];
  paymentLookUps: PaymentLookUp[];
  startingPay = -1;
  churchId: string;
  tierId: number;
  phone: string;
  paymentConfirmationData: {};
  //paymentPayload: {};
  memberId: number;
  paymentLogList = [];
  minusBtnClass = 'minimumMonth';
  plusBtnClass = 'notMaximumMonth';
  year: number;
  private subscriptions: Subscription [] = [];
  lookupList: LookupModel[] = [];

  ngOnInit() {
    // this.getPaymentLookupData();
    //this.selecteddata=this.data;
    this.fullName = this.data.paymentDetail.firstName + ' ' + this.data.paymentDetail.middleName + ' ' + this.data.paymentDetail.lastName;
    this.paymentLogs = this.data.paymentDetail.paymentLogs;
    this.churchId = this.data.paymentDetail.churchId;
    this.tierId = this.data.paymentDetail.tier;
    this.phone = this.data.paymentDetail.homePhoneNo;
    this.memberId = this.data.paymentDetail.memberId;
    this.year = this.data.year;
    this.determineMinimumMaximumMonths();
    this.getPaymentLookupData();
  }

  getPaymentLookupData() {
    this.subscriptions.push(
        this.lookupsService.getLookUpList(this.tierId, this.year).subscribe(
          response => {
            if (response != null) {
              this.lookupList = response as LookupModel[];
            } else {
              this.lookupList = [];
            }
          },
          (error) => {
            console.log(error);
          },
          () => { }
        )
    );
  }

  dismiss() {
    this.dialogRef.close('loadPaymentList');
  }

  // determineMinimumMaximumMonths(): void {
  //   for (let i = 0; i < this.paymentLogs.length; i++) {
  //     if (this.paymentLogs[i].paymentLogId == null
  //       && this.verifyRegistrationDate(this.paymentLogs[i].month, this.paymentLookUps[i].year)) {
  //       if (this.startingPay === -1) {
  //         this.startingPay = i;
  //         this.index = this.startingPay + 1;
  //       }
  //       this.maximumMonths++;
  //     }
  //   }
  //   if (this.maximumMonths >= 1) {
  //     this.minimumMonths = 1;
  //     this.months = 1;
  //     this.total += this.paymentLookUps[this.startingPay].amount;
  //   } else {
  //     this.months = 0;
  //   }
  // }

  determineMinimumMaximumMonths(): void {
    for (let i = 0; i < this.data.paymentDetail.paymentLogs.length; i++) {
      if (this.data.paymentDetail.paymentLogs[i].paymentLogId === 0
        && this.verifyPaymentStartDate(this.data.paymentDetail.paymentLogs[i].month, this.data.paymentDetail.paymentLogs[i].year)) {
        if (this.startingPay === -1) {
          this.startingPay = i;
          this.index = this.startingPay + 1;
        }
        this.maximumMonths++;
      }
    }
    if (this.maximumMonths >= 1) {
      this.minimumMonths = 1;
      this.months = 1;
      this.total += this.data.paymentDetail.paymentLogs[this.startingPay].amount;
    } else {
      this.months = 0;
    }
  }

  verifyPaymentStartDate(month: number, year: number): boolean {
    const paymentStartYear = new Date(this.data.paymentDetail.paymentStartDate).getFullYear();
    const paymentStartMonth = new Date(this.data.paymentDetail.paymentStartDate).getUTCMonth() + 1;
    if (paymentStartYear < year || (paymentStartYear === year && paymentStartMonth <= month)) {
      return true;
    }
    return false;

  }

  calculateTotalPlusMonthClicked(): void {
    if (this.months < this.maximumMonths) {
      this.total += this.data.paymentDetail.paymentLogs[this.index].amount;
      this.index++;
      this.months++;
    }
    this.determineMinusPlusYearBtnColor();
  }

  // calculateTotalPlusMonthClicked(): void {
  //   if (this.months < this.maximumMonths) {
  //     this.total += this.paymentLookUps[this.index].amount;
  //     this.index++;
  //     this.months++;
  //   }
  //   this.determineMinusPlusYearBtnColor();
  // }

  calculateTotalMinusMonthClicked(): void {
    if (this.index > this.startingPay) {
      this.months--;
      this.index--;
      this.total -= this.data.paymentDetail.paymentLogs[this.index].amount;
    }
    this.determineMinusPlusYearBtnColor();
  }

  // calculateTotalMinusMonthClicked(): void {
  //   if (this.index > this.startingPay) {
  //     this.months--;
  //     this.index--;
  //     this.total -= this.paymentLookUps[this.index].amount;
  //   }
  //   this.determineMinusPlusYearBtnColor();
  // }

  makePayment() {
    this.paymentConfirmation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '28%';
    dialogConfig.data = this.paymentConfirmationData;
    const dialogRef = this.dialog.open(PaymentConfirmationComponent, dialogConfig);
    console.log(`Number of months: ${this.months}, Amount paid: ${this.total}`);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.dialogRef.close('loadPaymentList');
      }
    });
  }

  paymentConfirmation(): void {
    this.paymentConfirmationData = {
      memberId: this.memberId,
      name: this.fullName,
      churchId: this.churchId,
      tier: this.tierId,
      phone: this.phone,
      months: this.months,
      total: this.total,
      index: this.index,
      paymentLookUps: this.lookupList,
      startingPay: this.startingPay,
      year: this.year
    };
  }

  determineMinusPlusYearBtnColor(): void {
    if (this.months <= this.minimumMonths) {
      this.minusBtnClass = 'minimumMonth';
    } else {
      this.minusBtnClass = 'notMinimumMonth';
    }

    if (this.months >= this.maximumMonths) {
      this.plusBtnClass = 'maximumMonth';
    } else {
      this.plusBtnClass = 'notMaximumMonth';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
