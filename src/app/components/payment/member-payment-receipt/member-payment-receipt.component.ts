import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { MemberPaymentPreviewComponent } from '../member-payment-preview/member-payment-preview.component';

@Component({
  selector: 'app-member-payment-receipt',
  templateUrl: './member-payment-receipt.component.html',
  styleUrls: ['./member-payment-receipt.component.css']
})
export class MemberPaymentReceiptComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  private dialogRef: MatDialogRef<MemberPaymentReceiptComponent>,
  private dialog: MatDialog) { }

  fullName: string = "";
  ngOnInit() {
    this.fullName = this.data.fullName;
    console.log(this.data.fullName);
  }

  openPreviewWindow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "65%";
    let dialogRef = this.dialog.open(MemberPaymentPreviewComponent, { width: "65%", data: this.data });
    
  }

  printReceipt() {

  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
