import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserModel } from './user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { Roles } from '../shared/roles';
import { Role } from '../shared/role';
import { UserModelResponse } from './user-registration/user-model-response';
import { resolve } from 'url';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription [] = [];
  selection = new SelectionModel<UserModel>(true, []);
  userListData = new MatTableDataSource<UserModelResponse>();
  userList: UserModelResponse[] = [];
  showAll = false;
  loggedUserEmailId = '';

  //displayedColumns: string[] = [ 'userId', 'fullName', 'email', 'phoneNo', 'createdDate', 'updatedDate', 'roles', 'isActive', 'actions'];
  displayedColumns: string[] = [ 'userId', 'userName', 'roles', 'createdBy', 'updatedBy', 'createdDate', 'updatedDate', 'isActive', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isLoading = false;
  searchKey: string;

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private datePipe: DatePipe,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.getUserList();
    this.userListData.paginator = this.paginator;
  }

  getUserList() {
    this.loggedUserEmailId = this.authService.decodedToken().sub;
    this.isLoading = true;
    this.userList = [];
    this.userListData.data = [];
    this.subscriptions.push(
        this.userService.getUsers().subscribe(
          response => {
            console.log(response);
            response = response as UserModelResponse[];
            if (response != null) {
              for (let i = 0; i < response.length; i++) {
                if (response[i].username === this.loggedUserEmailId) {
                  response.splice(i, 1);
                  break;
                }
                if (null !== response[i].roles) {
                  response[i].roles.forEach(r => {
                    if (r.name === 'ADMIN') {
                      response.splice(i, 1);
                    }
                  });
               }
              }
              if (this.showAll) {
                this.userListData.data = response as UserModelResponse[];
                this.userList = response as UserModelResponse[];
              } else {
                response.forEach(user => {
                  if (user.active) {
                      this.userList.push(user);
                  }
                });
                this.userListData.data = this.userList as UserModelResponse[];
              }
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

  // getUserList() {
  //   this.isLoading = true;
  //   setTimeout(() => {
  //     this.subscriptions.push(
  //       this.userService.getUsers(this.showAll).subscribe(
  //         response => {
  //           if (response != null) {
  //             this.userListData.data = response as UserModel[];
  //             this.userList = response as UserModel[];
  //           } else {
  //             this.userList = [];
  //             this.userListData.data = [];
  //           }
  //         },
  //         (error) => {
  //           this.isLoading = false;
  //           console.log(error);
  //         },
  //         () => {
  //           this.isLoading = false;
  //         }
  //       )
  //     );
  //   }, 1000);

  // }

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

  getRoles(user: UserModelResponse) {
    let roleNames = '';
    if (null !== user.roles) {
      for (let i = 0; i < user.roles.length; i++) {
        if (i !== 0) {
          roleNames += ', ' + user.roles[i].name;
        } else {
          roleNames += user.roles[i].name;
        }
      }
    }
    return roleNames;
  }

  onAddUser() {
    this.onSearchClear();
    this.showAll = false;
    this.getUserList();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '%';

    const dialogRef = this.dialog.open(UserRegistrationComponent, dialogConfig);
    this.subscriptions.push(dialogRef.afterClosed().subscribe(() => {
      this.getUserList();
    }));
  }

  onEdit(user: UserModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '69%';
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(UserEditComponent, dialogConfig);
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
