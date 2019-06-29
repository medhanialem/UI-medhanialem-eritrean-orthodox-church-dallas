import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../shared/member.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MemberComponent } from '../member/member.component';
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
}
