import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Roles } from 'src/app/shared/roles';
import { Member } from 'src/app/components/members/member';
import { MemberService } from 'src/app/components/members/shared/member.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSelect } from '@angular/material';
import { DialogCloseComponent } from 'src/app/components/members/add-member-dialog-close/dialog-close.component';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/shared/role';
import { RoleService } from 'src/app/shared/role-service';
import { UserModelResponse } from './user-model-response';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  private subscriptions: Subscription [] = [];

  members: Member[] = [];
  roles: any = Roles;
  rolesFromDB: Role [] = [];
  email = '';
  phoneNo = '';
  registrationForm: FormGroup;
  user: UserModel = new UserModel();

  selectedRoles: Role[] = [];

  users: UserModelResponse [] = [];

  constructor(
    private memberService: MemberService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserRegistrationComponent>,
    private userService: UserService,
    private roleService: RoleService,
    private alertify: AlertifyService) {
    this.registrationForm = fb.group({
      user: [null, Validators.required],
      email: new FormControl({value: null, disabled: true} , [Validators.minLength(5), Validators.email]),
      phoneNo: new FormControl({value: null, disabled: true}),
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null],
      roles: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getRoles();
    this.getUserList();
    this.getAllMembers();
  }

  // getAllUserNames() {
  //   this.memberService.getAllUserNames().subscribe(
  //     (response) => {
  //       this.members = response as Member[];
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       // To-Do
  //     }
  //   );
  // }

  getAllMembers() {
    this.subscriptions.push(this.memberService.getAllMemberList().subscribe(
      (response) => {
        this.members = response as Member[];
        this.filterNewUsers();
        this.sortMembers();
      },
      (error) => {
        console.log(error);
      },
      () => {
        // To-Do
      }
      )
    );
  }

  getUserList() {
    this.users = [];
    this.subscriptions.push(
        this.userService.getUsers().subscribe(
          response => {
            if (response != null) {
                this.users = response as UserModelResponse[];
            }
          },
          (error) => {console.log(error); },
          () => { }
        )
    );

  }

  filterNewUsers() {
    console.log('this.users', this.users);
    for(let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < this.members.length; j++) {
        if (this.members[j].email === this.users[i].username) {
          this.members.splice(j, 1);
          break;
        }
      }
    }
  }

  onRolesSelected(event) {
    this.selectedRoles = event.value;
  }

  sortMembers() {
    this.members = this.members.sort((a, b) => {
      if (a.firstName < b.firstName) { return -1; }
      if (a.firstName > b.firstName) { return 1; }
    });
  }

  getRoles() {
    this.rolesFromDB = [];
    this.subscriptions.push(
        this.roleService.getAllRoles().subscribe(
          response => {
            if (response != null) {
              response.forEach(r => {
                if (r.name !== 'ADMIN') {
                  this.rolesFromDB.push(r);
                }
              });
            }
          },
          (error) => {console.log(error); },
          () => { }
        )
    );
  }

  onMemberSelected(event: any) {
    this.email = event.value.email;
    this.phoneNo = event.value.homePhoneNo;
    this.user.username = event.value.email;
  }

  onSave() {
    if (this.registrationForm.valid && this.comparePasswords()) {
      this.populateUser();
      console.log('this.user', this.user);
      this.subscriptions.push(this.userService.addUser(this.user).subscribe(
        (result) => {
          console.log(result);
          this.alertify.success('Successfully registered ' + this.user.username);
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
          this.alertify.error('Unable to register ' + this.user.username);
        },
        () => {}
      )
      );

    }
  }

  // populateUser() {
  //   this.user.firstName = this.registrationForm.value.user.firstName;
  //   this.user.middleName = this.registrationForm.value.user.middleName;
  //   this.user.lastName = this.registrationForm.value.user.lastName;
  //   this.user.email = this.registrationForm.value.user.email;
  //   this.user.isActive = true;
  //   this.user.createdDate = new Date();
  //   this.user.updatedDate = new Date();
  //   this.user.phoneNo = this.registrationForm.value.user.homePhoneNo;
  //   this.user.roles = this.registrationForm.value.roles.toString().split(',');
  //   this.user.userId =  10;
  // }

  populateUser() {
    this.user.password = this.registrationForm.value.password;
    this.user.active = true;
    this.user.role = [];
    this.selectedRoles.forEach(r => {
      // this.user.role.push({id: r.id, name: r.name.replace('_', ' ').toLowerCase()} as Role);
      this.user.role.push(r.name.replace(/_/g, ' ').toLowerCase());
    });
  }

  onClear() {
    this.registrationForm.reset();
  }

  onClose() {
    if (this.registrationForm.dirty) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '30%';
      const dialogRef = this.dialog.open(DialogCloseComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          this.dialogRef.close(null);
        }
      });
    } else {
      this.dialogRef.close(null);
    }
  }

  saveUserDisabled() {
    return !this.registrationForm.valid || !this.comparePasswords() ;
  }

  comparePasswords() {
    if (this.registrationForm.value.confirmPassword != null) {
      return this.registrationForm.value.password === this.registrationForm.value.confirmPassword;
    }
    return false;
  }

  showConfirmPasswordErrorMessage() {
    if (
      this.registrationForm != null &&
      this.registrationForm.dirty &&
      this.registrationForm.value.confirmPassword != null &&
      this.registrationForm.value.confirmPassword.toString().length > 0
      ) {
      const password = this.registrationForm.value.password;
      const confirmPassword = this.registrationForm.value.confirmPassword;
      return password === confirmPassword ? false : true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
