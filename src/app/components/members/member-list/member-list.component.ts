import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../shared/member.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MemberComponent } from '../member/member.component';
import { MessageComponent} from '../../message/message.component';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private service: MemberService, 
    private dialog: MatDialog,
    private notifiationService: NotificationService,
    private dialogService: DialogService) { }

  memberListData: MatTableDataSource<any>;
  displayedColumns: string[] = ['select','$key', 'firstName', 'lastName', 'gender', 'mobile', 'address', 'email', 'registrationDate', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  memberList: Array<any>;
  sebekaGubae: Array<any> = [];
  sundaySchool: Array<any> = [];
  sebekaGubaeSundaySchool: Array<any> = [];

  sebekaGubaeFlag: boolean = false;
  sundaySchoolFlag: boolean = false;
  tableHeaderCheckbox: boolean = false;

  membersSelectedPhones: Array<any> = [];
  membersForPhoneList: Array<any> = [];

  tempMember: any;
  sendMessageBtnDisable: boolean = true;

  ngOnInit() {
    // this.service.getMembers().subscribe(list => {
    //   let array = list.map(item => {
    //     return {
    //       $key: item.key,
    //       ...item.payload.val()
    //     }
    //   })
    // })
    
    // console.log("this.memberList ", this.memberList)

    // let array = this.memberList.map(item => {
    //   return {
    //     item
    //   }
    // });

    this.memberList = this.service.getMembers();
    this.memberListData = new MatTableDataSource(this.memberList);
    this.memberListData.sort = this.sort;
    this.memberListData.paginator = this.paginator;
    // this.memberListData.filterPredicate = (data, filter) => {
    //   return this.displayedColumns.some(ele => {
    //     console.log("ele ", ele)
    //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
    //   });
    // };

    // Filtering members for SMS purpose
    this.arrangeMembers();
  }

  onSearchClear() {
    this.searchKey ="";
    this.applyFilter();
  }

  applyFilter (){
    this.memberListData.filter = this.searchKey.trim().toLowerCase();
  }

  onAddMember(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(MemberComponent, dialogConfig);
  }

  onSendSMS() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = this.membersSelectedPhones;
    this.dialog.open(MessageComponent, dialogConfig);
  }
  
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(MemberComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService.openConfirmDialog("Are you sure to delete this record?")
    .afterClosed().subscribe(res => {
      if (res){
        this.service.deleteMember($key);
        this.notifiationService.warn("! Deleted successfully");
        // Needs modification
        this.memberListData = new MatTableDataSource(this.memberList);
      }
    })
  }

  // This code snippet puts members to different arrays for searching purpose
  arrangeMembers():void {
    for (let i = 0; i < this.memberList.length; i++){
      if (this.memberList[i].isSebekaGubae == true) {
        this.sebekaGubae.push(this.memberList[i]);
      }
      if (this.memberList[i].isSundaySchoolMember == true) {
        this.sundaySchool.push(this.memberList[i]);
      }
      if (this.memberList[i].isSebekaGubae == true || this.memberList[i].isSundaySchoolMember == true) {
        this.sebekaGubaeSundaySchool.push(this.memberList[i]);
      }
    }
  }

  // This code snippet renders the registration mat table
  changeMatTableDataSource(event, typeSelected):void {
    // Clear out count of selected members
    // this.tableHeaderCheckbox = false;
    // this.membersSelectedPhones = [];

    this.onSearchClear();
    if (typeSelected == "sebekaGubae"){
      this.sebekaGubaeFlag = !this.sebekaGubaeFlag;
    }
    if (typeSelected == "sundaySchool"){
      this.sundaySchoolFlag = !this.sundaySchoolFlag;
    }
    if (this.sebekaGubaeFlag && this.sundaySchoolFlag) {
      this.memberListData = new MatTableDataSource(this.sebekaGubaeSundaySchool);
    }
    else if (this.sebekaGubaeFlag) {
      this.memberListData = new MatTableDataSource(this.sebekaGubae);
    }
    else if (this.sundaySchoolFlag) {
      this.memberListData = new MatTableDataSource(this.sundaySchool);
    }
    else {
      this.memberListData = new MatTableDataSource(this.memberList);
    }
    this.memberListData.sort = this.sort;
    this.memberListData.paginator = this.paginator;
  }

  /**
  /* When table header checkbox gets clicked
  /* If the checkbox for all rows at the top is checked add all numbers else 
  /* remove all and add the selected ones
  **/
  changeTableHeaderCheckbox (): void {
    this.tableHeaderCheckbox = !this.tableHeaderCheckbox;
    if(this.tableHeaderCheckbox){
      this.membersForPhoneList = this.memberListData.filteredData;
    }
    else {
      this.membersForPhoneList = [];
    }
    this.filterPhoneNumbers();
    console.log(this.membersSelectedPhones.length);
  }

  filterSelectedMembersPhoneNumbers(event, mobile, key): void {
    if (event.checked) {
      if (!this.checkIfMemberIsAddedToPhoneList(key)) {
        this.createMemberTobeAddedToPhoneList(key, mobile);
        this.addMemberToPhoneList(this.tempMember);
      }
    }
    else {
      this.removeMemberFromPhoneList(key);
    }
    // If nothing is selected the top checkbox must be unchecked
    // else if all the rows are checked top checkbox must be checked
    // if (this.membersSelectedPhones.length == 0) {
    //   this.tableHeaderCheckbox = false;
    // }
    // else if (this.membersSelectedPhones.length == this.memberListData.filteredData.length){
    //   this.tableHeaderCheckbox = true;
    // }
    this.filterPhoneNumbers();
    console.log(this.membersSelectedPhones.length);
  }

  checkIfMemberIsAddedToPhoneList(key): boolean {
    for (let i = 0; i < this.membersForPhoneList.length; i++) {
      if (this.membersForPhoneList[i].$key === key){
        return true;
      }
    }
    return false;
  }

  removeMemberFromPhoneList(key): void {
    let tempMembersForPhoneList = [];
    for (let i = 0; i < this.membersForPhoneList.length; i++) {
      if (this.membersForPhoneList[i].$key !== key){
        tempMembersForPhoneList.push(this.membersForPhoneList[i]);
      }
    }
    this.membersForPhoneList = tempMembersForPhoneList;
  }

  addMemberToPhoneList(member): void {
    this.membersForPhoneList.push(member);
  }

  filterPhoneNumbers():void {
    this.membersSelectedPhones = [];
    for (let i = 0; i < this.membersForPhoneList.length; i++) {
      this.membersSelectedPhones.push(this.membersForPhoneList[i].mobile);
    }
    (this.membersSelectedPhones.length > 0) ? this.sendMessageBtnDisable = false: this.sendMessageBtnDisable = true;
  }

  createMemberTobeAddedToPhoneList (key1, mobile): void {
    this.tempMember = {
      $key: key1,
      firstName: 'AAAAA',
      lastName: 'BBBBB',
      dependency: '1',
      relationship: '1',
      gender: '1',
      mobile: mobile,
      address: '8901 Veller Ave Dallas, TX 75233',
      email: 'AAAAA.BBBBB@gmail.com',
      registrationDate: '4/13/2019',
      isSundaySchoolMember: false,
      isSebekaGubae: false
    }
  }
}
