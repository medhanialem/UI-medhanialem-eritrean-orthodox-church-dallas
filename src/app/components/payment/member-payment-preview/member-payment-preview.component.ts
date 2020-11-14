import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-payment-preview',
  templateUrl: './member-payment-preview.component.html',
  styleUrls: ['./member-payment-preview.component.css']
})
export class MemberPaymentPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  private dialogRef: MatDialogRef<MemberPaymentPreviewComponent>,
  private dialog: MatDialog,
  private datePipe: DatePipe) 
  { }

  fullName: string;
  total = 0;
  months = 0;
  churchId: string;
  tierId: number;
  phone: string;
  memberId: number;
  startingPay= -1;
  index = -1;
  date = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
  year: number;
  monthsLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  ngOnInit() {
    this.fullName = this.data.fullName;
    this.total = this.data.total;
    this.months = this.data.months;
    this.churchId = this.data.churchId;
    this.tierId = this.data.tierId;
    this.phone = this.data.phone;
    this.memberId = this.data.memberId;
    this.startingPay = this.data.startingPay;
    this.index = this.data.index;
    this.year = this.data.year;
    this.markMonths();
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  markMonths() {

  }
  printReceipt(){
    
  }
}
