import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { PaymentService } from '../shared/payment.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { MemberModel, PaymentLog } from '../shared/member.model';
import { DatePipe } from '@angular/common';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  constructor(
    private alertify: AlertifyService,
    private service: PaymentService,
    private dialog: MatDialog,
    private datePipe: DatePipe) { }

  paymentListData = new MatTableDataSource<MemberModel>();
  //displayedColumns: string[] = ['select', 'memberId', 'firstName', 'middleName', 'lastName', 'tier', 'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  displayedColumns: string[] = ['select', 'churchId', 'name', 'homePhoneNo', 'unpaidMonths', 'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //paymentList: Array<MemberModel> ;
  //currentYear = new Date().getFullYear();
  //selected = new Date().getFullYear();
  selectedrow: MemberModel = null;
  year: number = new Date().getFullYear();
  minimumYear = 2020;
  maximumYear: number = new Date().getFullYear() + 1;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;
  minusBtnClass = 'notMinimumYear';
  plusBtnClass = 'notMaximumYear';
  isLoading = false;
  private subscriptions: Subscription[] = [];
  memberPaymentDetail: MemberModel[] = [];
  filteredList: MemberModel[] = [];
  disableForgivenessBtn: boolean;
  unpaidMonths = 0;

  activeInactiveStatus = 'Active';
  memberStatuses: any[] = [
    {value: 'Active', displayValue: 'Active'},
    {value: 'Inactive', displayValue: 'Inactive'},
    {value: 'All', displayValue: 'All'}
  ];

  ngOnInit() {
    this.getPaymentList();
    // this.paymentList = this.service.getPaymentList();
    // this.paymentListData = new MatTableDataSource(this.paymentList);
    this.paymentListData.paginator = this.paginator;
    this.paymentListData.sort = this.sort;

    // this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
    //   const refresh = paramMap.get('refresh');
    //   if (refresh) {
    //     this.paymentList = this.service.getPaymentList2();
    //   }
    // });
  }

  getPaymentList() {
    this.isLoading = true;
    this.subscriptions.push(this.service.getPaymentList('' + this.year).subscribe(
      (
        response => {
          this.memberPaymentDetail = response as MemberModel[];
          this.memberPaymentDetail.forEach(mpd => {
            // mpd.paymentLogs = this.sortPaymentLogsPerMonth(mpd.paymentLogs as PaymentLog[]);
            mpd.paymentLogs = this.populatePaymentLogsPerMonth(mpd.paymentLogs as PaymentLog[]);
          });
          this.paymentListData.data = this.memberPaymentDetail;
          this.activeInactiveStatus = 'Active';
          this.filterPaymentsByMemberStatus();
        }
      ),
      (
        error => {
          console.log(error.message);
          this.isLoading = false;
        }
      ),
      () => {
        this.isLoading = false;
       }
    ));
  }

  // sortPaymentLogsPerMonth(paymentLog: PaymentLog[]) {
  //   return paymentLog.sort((a, b) => {
  //     if (a.month < b.month) { return -1; }
  //     if (a.month > b.month) { return 1; }
  //   });
  // }

  /*
   * This method is needed in order to make every incoming payment logs 12 (Jan - Dec)
  */
  populatePaymentLogsPerMonth(paymentLogs: PaymentLog[]): PaymentLog[] {
    const updatedPaymentLogs: PaymentLog[] = [];
    for (let i = 1; i < 13; i++) {
      updatedPaymentLogs.push({paymentLogId: 0, year: this.year,  month: i, amount: 0, forgiven: false});
    }

    for (let j = 0; j < paymentLogs.length; j++) {
      for (let k = 0; k < updatedPaymentLogs.length; k++) {
        if (paymentLogs[j].month === k + 1) {
          updatedPaymentLogs[k].paymentLogId = paymentLogs[j].paymentLogId;
          updatedPaymentLogs[k].year = paymentLogs[j].year;
          updatedPaymentLogs[k].month = paymentLogs[j].month;
          updatedPaymentLogs[k].amount = paymentLogs[j].amount;
          updatedPaymentLogs[k].forgiven = paymentLogs[j].forgiven;
          break;
        }
      }
    }

    return updatedPaymentLogs;
  }

 // Check if there are unpaid payments before, then proceed with payment.
  proceedToPayment(type: string) {
    this.service.unpaidPreviousYearPaymentExist(
      this.selectedrow.memberId, (new Date(this.selectedrow.paymentStartDate)).getFullYear(), this.year).subscribe(
      (
        response => {
          if (response) {
            this.alertify.error('Unpaid payment exist for ' + (this.year - 1));
          } else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '30%';
            dialogConfig.data = { paymentDetail: this.selectedrow, year: this.year, paymentType: type, unpaidMonths: this.unpaidMonths};
            const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(payResponse => {
              if (payResponse === 'loadPaymentList') {
                this.getPaymentList();
                this.selectedrow = null;
              }
            });
          }

        }
      ),
      (
        error => {
          console.log(error.message);
          // Needs to be checked
        }
      ),
      () => { }
    );
  }

  onEdit(row: MemberModel) {
    // this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    // this.selectedrow = row;
    // let dialogRef=this.dialog.open(PaymentDialogComponent, {width:"60%",data:row});
    this.unpaidMonths = this.getUnpaidTotal(row.paymentStartDate, row.paymentLogs);
    this.unpaidMonths === 0 ? this.selectedrow = null : this.selectedrow = row;
    // Disable forgive payment btn
    // (12 - (new Date().getUTCMonth() + 1)) >= unpaidMonths ? 
    // this.disableForgivenessBtn = true : this.disableForgivenessBtn = false;

    if (row.paymentLogs[0].year <= new Date().getFullYear() && row.paymentLogs[new Date().getUTCMonth()].paymentLogId != 0) {
      this.disableForgivenessBtn = true;
    }

    if (row.paymentLogs[0].year <= new Date().getFullYear() && row.paymentLogs[new Date().getUTCMonth()].paymentLogId == 0) {
      this.disableForgivenessBtn = false;
    }

    if (row.paymentLogs[0].year > new Date().getFullYear()) {
      this.disableForgivenessBtn = false;
    }
  }

  applyFilter(filterValue: string) {
    this.paymentListData.filter = filterValue.trim().toLowerCase();
    this.selectedrow = null;
  }

  // compareRegistrationDate(registrationDate: Date, month: number, year: number) {
  //   console.log('Logging ' + registrationDate + ' month ' + month + ' year ' + year);
  //   if (registrationDate.getFullYear() < year) {
  //     return true;
  //   } else if (registrationDate.getFullYear() === year && registrationDate.getMonth() <= month) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  minusYearClicked(): void {
    this.year--;
    this.getPaymentList();
    this.selectedrow = null;
    this.determineMinusPlusYearBtnColor();
  }

  plusYearClicked(): void {
    this.year++;
    this.getPaymentList();
    this.selectedrow = null;
    this.determineMinusPlusYearBtnColor();
  }

  currentYearClicked(): void {
    this.year = new Date().getFullYear();
    this.getPaymentList();
    this.selectedrow = null;
    this.determineMinusPlusYearBtnColor();
  }

  // getUnpaidTotal(paymentStartDate: Date, paymentLogs: PaymentLog[]) {
  //   let unpaidMonthsCounter = 0;
  //   paymentLogs.forEach(p => {
  //     if (!this.registrationAfterThisMonth(paymentStartDate, p.month) && p.paymentLogId === 0) {
  //       unpaidMonthsCounter++;
  //     }
  //   });
  //   return unpaidMonthsCounter;
  // }

  getUnpaidTotal(paymentStartDate: Date, paymentLogs: PaymentLog[]) {
    let unpaidMonthsCounter = 0;
    paymentLogs.forEach(p => {
      if (p.paymentLogId === 0 && this.registrationBeforeThisMonth(paymentStartDate, p.month)) {
        unpaidMonthsCounter++;
      }
    });
    return unpaidMonthsCounter;
  }

  // registrationAfterThisMonth(paymentStartDate: Date, monthToPay: number): boolean {
  //   const paymentStartYear = new Date(paymentStartDate).getFullYear();
  //   const paymentStartMonth = new Date(paymentStartDate).getUTCMonth() + 1;
  //   if (paymentStartYear > this.year || (paymentStartYear === this.year && paymentStartMonth > monthToPay)) {
  //     return true;
  //   }
  //   return false;

  // }

  registrationBeforeThisMonth(paymentStartDate: Date, monthToPay: number): boolean {
    const paymentStartYear = new Date(paymentStartDate).getFullYear();
    const paymentStartMonth = new Date(paymentStartDate).getUTCMonth() + 1;
    if (paymentStartYear > this.year || (paymentStartYear === this.year && paymentStartMonth > monthToPay)) {
      return false;
    }
    return true;

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter(this.searchKey);
    this.selectedrow = null;
  }

  determineMinusPlusYearBtnColor(): void {
    if (this.year <= this.minimumYear) {
      this.minusBtnClass = 'minimumYear';
    } else {
      this.minusBtnClass = 'notMinimumYear';
    }

    if (this.year >= this.maximumYear) {
      this.plusBtnClass = 'maximumYear';
    } else {
      this.plusBtnClass = 'notMaximumYear';
    }
  }

  onActiveInactiveDropDownChange(event) {
    this.activeInactiveStatus = event.value;
    this.filterPaymentsByMemberStatus();
  }

  filterPaymentsByMemberStatus() {
    this.filteredList = [];
    if (this.activeInactiveStatus === 'All') {
        this.filteredList = this.memberPaymentDetail;
    } else {
        this.memberPaymentDetail.forEach(mpd => {
          if (mpd.status === this.activeInactiveStatus.toUpperCase()) {
            this.filteredList.push(mpd);
          }
        });
    }
    this.paymentListData.data = this.filteredList;
   }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
