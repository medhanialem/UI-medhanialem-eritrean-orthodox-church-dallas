import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserModel } from './user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription [] = [];
  selection = new SelectionModel<UserModel>(true, []);
  userListData = new MatTableDataSource<UserModel>();
  userList: UserModel[];
  showAll = false;

  displayedColumns: string[] = [ 'userId', 'fullName', 'email', 'phoneNo', 'createdDate', 'updatedDate', 'roles', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isLoading = false;
  searchKey: string;

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.getUserList();
    this.userListData.paginator = this.paginator;
  }

  getUserList() {
    this.isLoading = true;
    setTimeout(() => {
      this.subscriptions.push(
        this.userService.getUsers(this.showAll).subscribe(
          response => {
            if (response != null) {
              this.userListData.data = response as UserModel[];
              this.userList = response as UserModel[];
            } else {
              this.userList = [];
              this.userListData.data = [];
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
    }, 1000);

  }

  toShortDate(value) {
    return this.datePipe.transform(value, 'MM-dd-yyyy');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.userListData.filter = this.searchKey.trim().toLowerCase();
  }

  showAllUsers() {
    this.getUserList();
  }

  getRoles(user: UserModel) {
    return user.roles;
  }

  onAddUser() {
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '69%';

    const dialogRef = this.dialog.open(UserRegistrationComponent, dialogConfig);
    this.subscriptions.push(dialogRef.afterClosed().subscribe(() => {
      this.getUserList();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
