import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../shared/payment.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { MemberModel } from '../shared/member.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  constructor(private service: PaymentService,
    private dialog: MatDialog, private datePipe: DatePipe) { }
  paymentListData = new MatTableDataSource<MemberModel>();
  //displayedColumns: string[] = ['select', 'memberId', 'firstName', 'middleName', 'lastName', 'tier', 'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  displayedColumns: string[] = ['select', 'churchId', 'name', 'homePhoneNo', 'unpaidMonths', 'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //paymentList: Array<MemberModel> ;
  //currentYear = new Date().getFullYear();
  //selected = new Date().getFullYear();
  selectedrow: MemberModel = null;
  //years: any[]=[2018,2017,2016,2015,2014,2013];
  year:number = new Date().getFullYear();
  minimumYear: number = 2012
  maximumYear: number = new Date().getFullYear() + 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;
  minusBtnClass: string = "notMinimumYear";
  plusBtnClass: string = "notMaximumYear";

  abc() {
    console.log(this.selectedrow);
  }

  ngOnInit() {
    console.log("On ng init.....");
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
    this.service.getPaymentList("" + this.year).subscribe(response => {
      this.paymentListData.data = response as MemberModel[];
    });
  }

  pay() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = this.selectedrow;
    let dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if(response == "loadPaymentList") {
        //this.getPaymentList();
        this.selectedrow = null;
      }
    });

  }

  onEdit(row: MemberModel) {
    // this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.selectedrow = row;
    // let dialogRef=this.dialog.open(PaymentDialogComponent, {width:"60%",data:row});
  }

  applyFilter(filterValue: string) {
    this.paymentListData.filter = filterValue.trim().toLowerCase();
    this.selectedrow = null;
  }

  compareRegistrationDate(registrationDate: Date, month: number, year: number) {
    console.log("Logging " + registrationDate + " month " + month + " year " + year)
    if (registrationDate.getFullYear() < year) {
      return true;
    }
    else if (registrationDate.getFullYear() == year && registrationDate.getMonth() <= month) {
      return true;
    }
    else {
      return false;
    }

  }

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

  registrationAfterThisMonth(registrationMonth:number, registrationYear:number, monthToPay:number) :boolean{
    if(registrationYear > this.year || (registrationYear === this.year && registrationMonth > monthToPay)){
      return true;
    }
    return false;

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter(this.searchKey);
    this.selectedrow = null;
  }

  determineMinusPlusYearBtnColor(): void {
    if(this.year <= this.minimumYear) {
      this.minusBtnClass = "minimumYear";
    }
    else {
      this.minusBtnClass = "notMinimumYear";
    }

    if (this.year >= this.maximumYear){
      this.plusBtnClass = "maximumYear";
    }
    else {
      this.plusBtnClass = "notMaximumYear";
    }
  }
   
}