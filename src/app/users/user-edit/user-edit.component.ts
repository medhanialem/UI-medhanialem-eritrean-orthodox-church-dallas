import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Roles } from 'src/app/shared/roles';
import { Member } from 'src/app/components/members/member';
import { MemberService } from 'src/app/components/members/shared/member.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCloseComponent } from 'src/app/components/members/add-member-dialog-close/dialog-close.component';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  // members: Member[] = [];
  roles: any = Roles;
  // email = '';
  // phoneNo = '';
  editUserForm: FormGroup;
  user: UserModel = new UserModel();
  activeInactive = ['Active', 'Inactive'];
  selected = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: UserModel,
    private memberService: MemberService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserEditComponent>,
    private userService: UserService) {
      this.editUserForm = fb.group({
      user: new FormControl({value: data.firstName + ' ' + data.middleName + ' ' + data.lastName, disabled: true}, Validators.required),
      email: new FormControl({value: data.email, disabled: true}),
      phoneNo: new FormControl({value: data.phoneNo, disabled: true}),
      // password: [null, [Validators.required, Validators.minLength(5)]],
      // confirmPassword: [null],
      roles: [data.roles, Validators.required],
      status: [data.isActive]
    });

  }

  ngOnInit() {
    // this.getAllUserNames();
    this.data.isActive ? this.selected = 'Active' : this.selected = 'Inactive';
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

  // onMemberSelected(event: any) {
  //   this.email = event.value.email;
  //   this.phoneNo = event.value.homePhoneNo;
  // }

  onSave() {
    if (this.editUserForm.valid && this.comparePasswords()) {
      this.populateUser();
      this.userService.addUser(this.user).subscribe(
        (result) => {
          console.log(result);
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );

    }
  }

  populateUser() {
    this.user.firstName = this.data.firstName;
    this.user.middleName = this.data.middleName;
    this.user.lastName = this.data.lastName;
    this.user.email = this.data.email;
    this.user.isActive = true;
    this.user.createdDate = this.data.createdDate;
    this.user.updatedDate = new Date();
    this.user.phoneNo = this.data.phoneNo;
    this.user.roles = this.editUserForm.value.roles.toString().split(',');
    this.user.userId =  this.data.userId;
  }

  // onClear() {
  //   this.registrationForm.reset();
  // }

  onClose() {
    if (this.editUserForm.dirty) {
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
    //return !this.editUserForm.valid || !this.comparePasswords() || !this.editUserForm.dirty;
    return !this.editUserForm.valid || !this.editUserForm.dirty;
  }

  comparePasswords() {
    if (this.editUserForm.value.confirmPassword != null) {
      return this.editUserForm.value.password === this.editUserForm.value.confirmPassword;
    }
    return false;
  }
  showConfirmPasswordErrorMessage() {
    if (
      this.editUserForm != null &&
      this.editUserForm.dirty &&
      this.editUserForm.value.confirmPassword != null &&
      this.editUserForm.value.confirmPassword.toString().length > 0
      ) {
      const password = this.editUserForm.value.password;
      const confirmPassword = this.editUserForm.value.confirmPassword;
      return password === confirmPassword ? false : true;
    }
    return false;
  }


}
