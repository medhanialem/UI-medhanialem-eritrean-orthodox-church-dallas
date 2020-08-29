import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { MemberPaymentReceiptComponent } from '../member-payment-receipt/member-payment-receipt.component';
import { PaymentService } from '../shared/payment.service';
import { Paymentrequest } from '../shared/paymentrequest';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { PaymentResponse } from '../shared/payment-response';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {

  constructor(
    private alertify: AlertifyService,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<PaymentConfirmationComponent>,
    private dialog: MatDialog
  ) { }

  fullName: string;
  total = 0;
  months = 0;
  churchId: string;
  tierId: number;
  phone: string;
  paymentPayload: Paymentrequest = new Paymentrequest();
  memberId: number;
  paymentLogList = [];
  startingPay = -1;
  index = -1;
  paymentLookUps = [];
  memberPaymentReceiptData = {};
  yesBtnClicked = '';
  year: number;

  ngOnInit() {
    this.memberId = this.data.memberId;
    this.fullName = this.data.name;
    this.churchId = this.data.churchId;
    this.tierId = this.data.tier;
    this.phone = this.data.phone;
    this.months = this.data.months;
    this.total = this.data.total;
    this.startingPay = this.data.startingPay;
    this.index = this.data.index;
    this.paymentLookUps = this.data.paymentLookUps;
    this.year = this.data.year;
    console.log(this.data);
  }

  dismiss() {
    this.dialogRef.close('no');
  }

  makePayment() {
    this.createPaymentLogs();
    this.paymentPayLoad();
    this.paymentService.addPayment(this.paymentPayload).subscribe(
      (result) => {
        const paymentResponse = result as PaymentResponse;
        console.log(result);
        this.dialogRef.close('yes');
        this.alertify.success(
          'Payment Success \n'
          + 'Name:\t' + result.fullName + '\n '
          + 'Church Id:\t' + result.churchId + '\n '
          + 'Tier:\t' + result.tierDescription + '\n '
          + 'Months:\t' + result.numberOfMonthsPaid + '\n '
          + 'Total:\t' + result.total + '\n '
        );
      },
      (error) => {
        console.log(error);
        this.alertify.error(error.error.description);
        this.dialogRef.close('yes');
      },
      () => {}
    );


    //Hit the database with payment logs and reload the page with latest data
    // this.dialogRef.close('yes');
    // this.populateMemberPaymentReceiptData();
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '30%';
    // dialogConfig.data = this.memberPaymentReceiptData;
    // let dialogRef = this.dialog.open(MemberPaymentReceiptComponent, dialogConfig);
    // this.dismiss();
  }

  paymentPayLoad(): void {
    this.paymentPayload.memberId = this.memberId;
    this.paymentPayload.total = this.total;
    this.paymentPayload.payments = this.paymentLogList;
  }

  createPaymentLogs(): void {
    this.paymentLogList = [];
    for (let i = this.startingPay; i < this.index; i++) {
      this.paymentLogList.push({
        paymentLookupId: this.paymentLookUps[i].id,
        amount: this.paymentLookUps[i].amount
      });
    }
  }

  // populateMemberPaymentReceiptData(): void {
  //   this.memberPaymentReceiptData = {
  //     memberId: this.memberId,
  //     fullName: this.fullName,
  //     churchId: this.churchId,
  //     total: this.total,
  //     months: this.months,
  //     tierId: this.tierId,
  //     phone: this.phone,
  //     paymentLogList: this.paymentLogList,
  //     startingPay: this.startingPay,
  //     index: this.index,
  //     year: this.paymentLookUps[0].year,
  //     yesBtnClicked: 'yes'
  //   };
  // }
}
