import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Roles } from 'src/app/shared/roles';
import { Member } from 'src/app/components/members/member';
import { MemberService } from 'src/app/components/members/shared/member.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSelect } from '@angular/material';
import { DialogCloseComponent } from 'src/app/components/members/add-member-dialog-close/dialog-close.component';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  members: Member[] = [];
  roles: any = Roles;
  email = '';
  phoneNo = '';
  registrationForm: FormGroup;
  user: UserModel = new UserModel();
  constructor(
    private memberService: MemberService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserRegistrationComponent>,
    private userService: UserService) {
    this.registrationForm = fb.group({
      user: [null, Validators.required],
      email: new FormControl({value: null, disabled: true}),
      phoneNo: new FormControl({value: null, disabled: true}),
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null],
      roles: [null, Validators.required]
    });
  }


  ngOnInit() {
    this.getAllUserNames();
  }

  getAllUserNames() {
    this.memberService.getAllUserNames().subscribe(
      (response) => {
        this.members = response as Member[];
      },
      (error) => {
        console.log(error);
      },
      () => {
        // To-Do
      }
    );
  }

  onMemberSelected(event: any) {
    this.email = event.value.email;
    this.phoneNo = event.value.homePhoneNo;
  }

  onSave() {
    if (this.registrationForm.valid && this.comparePasswords()) {
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
    this.user.firstName = this.registrationForm.value.user.firstName;
    this.user.middleName = this.registrationForm.value.user.middleName;
    this.user.lastName = this.registrationForm.value.user.lastName;
    this.user.email = this.registrationForm.value.user.email;
    this.user.isActive = true;
    this.user.createdDate = new Date();
    this.user.updatedDate = new Date();
    this.user.phoneNo = this.registrationForm.value.user.homePhoneNo;
    this.user.roles = this.registrationForm.value.roles.toString().split(',');
    this.user.userId =  10;
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

}
