import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertifyService } from '../shared/alertify.service';
import { UserAuthorizationComponent } from '../users/user-authorization/user-authorization.component';
import { ReceiptsService } from './receipts.service';
import { MembershipReceiptHistory } from './membership.receipt.history';
import { EmailComponent } from './email/email.component';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription [] = [];
  receiptListData = new MatTableDataSource<MembershipReceiptHistory>();
  receiptList: MembershipReceiptHistory[];
  showAll = false;

  displayedColumns: string[] = [ 'receiptId', 'churchId', 'fullName', 'phone', 'parentReceipt', 'voided', 'total', 'createdBy', 'createdDate', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isLoading = false;
  searchKey = '';
  year = new Date().getFullYear();
  minimumYear = 2020;
  maximumYear: number = new Date().getFullYear() + 1;
  minusBtnClass = 'notMinimumYear';
  plusBtnClass = 'notMaximumYear';

  constructor(private receiptsService: ReceiptsService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getReceipts();
    this.receiptListData.paginator = this.paginator;
  }

  getReceipts() {
    this.isLoading = true;
    this.subscriptions.push(
        this.receiptsService.getReceipts(this.year, this.searchKey).subscribe(
          response => {
            console.log(response);
            if (response != null) {
              this.receiptListData.data = response as MembershipReceiptHistory[];
              this.receiptList = response as MembershipReceiptHistory[];
            } else {
              this.receiptList = [];
              this.receiptListData.data = [];
            }
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
          },
          () => {
            this.isLoading = false;
          }
        )
    );

  }

  toShortDate(value) {
    return this.datePipe.transform(value, 'MM-dd-yyyy hh:mm:ss');
  }

  onSearchClear() {
    this.searchKey = '';
    this.getReceipts();
    // this.applyFilter();
  }

  // applyFilter() {
  //   this.receiptListData.filter = this.searchKey.trim().toLowerCase();
  // }

  onPrint(row: MembershipReceiptHistory) {
    const receiptId= row.receiptId
    this.receiptsService.getPDF(receiptId).subscribe((response)=>{

      let file = new Blob([response], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);

    },(error) => {
      this.getReceipts();
      console.log(error);
      this.alertify.error('An error occured and hence can\'t view Receipt Id \'' + receiptId);
    }
  );
  }
  

  onSendEmail(row: MembershipReceiptHistory) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '22%';
    dialogConfig.data = {
      receiptId: row.receiptId,
      email: row.email
    };
    const dialogRef = this.dialog.open(EmailComponent, dialogConfig);
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Sending receipt to email of : ' + row.fullName);
        this.getReceipts();
        this.alertify.success('Receipt successfully sent for \' ' + row.fullName + '\'');
      } else if (result === false) {
        this.getReceipts();
        console.log('DIDN\'T send email to :' +  + row.fullName);
        this.alertify.error('An error occured while sending an email for \'' + row.fullName + '\'');
      } else {
        this.alertify.error('Email send CANCLED for \'' + row.fullName + '\'');
      }
    })
    );
  }

  onRefundClicked(row: MembershipReceiptHistory) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '47%';
    dialogConfig.data = {
      displayWarning: 'Are you sure you want to refund?',
      subject: 'Monthly payment with receipt no: ' + row.receiptId,
      subjectName: row.fullName,
      btnActionLabel: 'Refund Receipt'
    };
    const dialogRef = this.dialog.open(UserAuthorizationComponent, dialogConfig);
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          console.log('Refunding monthly payment with receipt: ' + row.receiptId);
          this.receiptsService.refundMonthlyPayment(row.receiptId).subscribe(
            () => {
              this.getReceipts();
              this.alertify.success(
                'Monthly membership payment of \' ' + row.fullName +
                ' \' refunded successfully.'
              );
              console.log('Refunded payment: ' + row);
            },
            (error) => {
              this.getReceipts();
              console.log(error);
              this.alertify.error('An error occured and hence can\'t refund for \'' + row.fullName + '\'');
            }
          );

      } else if (result === false) {
        this.getReceipts();
        console.log('DIDN\'T refund payment');
        this.alertify.error('Invalid password and hence can\'t refund for \'' + row.fullName + '\'');
      }
    })
    );
  }

  minusYearClicked(): void {
    this.year--;
    this.receiptList = [];
    this.receiptListData.data = [];
    this.getReceipts();
  }

  plusYearClicked(): void {
    this.year++;
    this.receiptList = [];
    this.receiptListData.data = [];
    this.getReceipts();
  }

  currentYearClicked(): void {
    this.year = new Date().getFullYear();
    this.receiptList = [];
    this.receiptListData.data = [];
    this.getReceipts();
  }

  formatTotal(row: MembershipReceiptHistory): string {
    return row.total < 0 ? '-$' + (-1 * row.total) : '$' + row.total;
  }

  totalClass(row: MembershipReceiptHistory): string {
    if (row.total < 0) {
      return 'refundTotal';
    } else if (row.voided) {
        return 'refundedOriginal';
    } else {
      return 'monthlyTotal';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
