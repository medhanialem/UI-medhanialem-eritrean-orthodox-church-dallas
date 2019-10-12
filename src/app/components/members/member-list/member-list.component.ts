import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MemberService } from '../shared/member.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MemberComponent } from '../member/member.component';
import { MessageComponent } from '../../message/message.component';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';
import { Member } from '../member';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(private service: MemberService,
              private dialog: MatDialog,
              private notifiationService: NotificationService,
              private dialogService: DialogService,
              private datePipe: DatePipe) { }

  private subscriptions: Subscription[] = [];
  selection = new SelectionModel<Member>(true, []);
  sundaySchool = false;
  sebekaGubae = false;
  memberListData = new MatTableDataSource<Member>();
  memberList: Member[];
  filteredList: Member[];

  displayedColumns: string[] = ['select', 'churchId', 'name', 'gender', 'homePhoneNo', 'address', 'email', 'registrationDate', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  ngOnInit() {
    this.getMemberList();
    this.memberListData.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.memberListData.sort = this.sort;
  }

  getMemberList() {
    this.subscriptions.push(this.service.getMemberList().subscribe(
      (
        response => {
          if (response != null) {

            this.memberListData.data = response as Member[];
            this.memberList = response as Member[];
          } else {
            this.memberListData.data = null;
          }
        }),
      (
        error => {
          console.log(error.message);
        })
    ));
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.memberListData != null && this.memberListData.data != null) {
      const numSelected = this.selection.selected.length;
      const numRows = this.memberListData.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.memberListData != null && this.memberListData.data != null) {
      this.isAllSelected()
        ? this.selection.clear()
        : this.memberListData.data.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Member): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
      } row ${row.memberId + 1}`;
  }

  toShortDate(value) {
    return this.datePipe.transform(value, 'MM-dd-yyyy');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.memberListData.filter = this.searchKey.trim().toLowerCase();
    // this.filteredList = [];
    // this.filteredList = this.memberListData.data;
  }

  changeMatTableDataSource() {
    // resets selected rows on sebekaGubae or sundaySchool selection
    this.selection.clear();
    this.filteredList = [];
    if (!this.sebekaGubae && !this.sundaySchool) {
        this.filteredList = this.memberList;
      } else {
        this.memberList.forEach(member => {
          if ((this.sundaySchool && this.sebekaGubae) && (member.sundaySchool && member.sebekaGubae)) {
            this.filteredList.push(member);
          } else if ((this.sundaySchool && !this.sebekaGubae) && (member.sundaySchool)) {
            this.filteredList.push(member);
          } else if ((!this.sundaySchool && this.sebekaGubae) && (member.sebekaGubae)) {
            this.filteredList.push(member);
          }

        });
      }
    this.memberListData.data = this.filteredList;
   }

   onAddMember(){
    //this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height= '90%'
    this.dialog.open(MemberComponent, dialogConfig);
  }

   onSendSMS() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = this.selection.selected;
    this.dialog.open(MessageComponent, dialogConfig);
  }

  abc(){
    console.log("***** Repeating ******")
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
