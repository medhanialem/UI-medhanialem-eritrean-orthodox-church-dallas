import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogCloseComponent } from '../../members/add-member-dialog-close/dialog-close.component';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { ChangePassword } from './changepsw-model';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changepasswordForm: FormGroup;
  changePassword: ChangePassword = new ChangePassword();
  private subscriptions: Subscription [] = [];

  constructor( private fb: FormBuilder,
    private dialog: MatDialog,private dialogRef: MatDialogRef<ChangepasswordComponent>,
    private profileService: ProfileService,
    private alertify: AlertifyService
   ) {  this.changepasswordForm = fb.group({ 
    currentpassword: [null, [Validators.required, Validators.minLength(5)]],
    password: [null, [Validators.required, Validators.minLength(5)]],
    confirmPassword: [null]
  });}

  ngOnInit() {
  }


  onChangePassword() {
    if (this.changepasswordForm.valid && this.comparePasswords()) {

      this.populateChangePassword();
      
      this.subscriptions.push(this.profileService.changePassword(this.changePassword).subscribe(
        (result) => {
          console.log(result);
          this.alertify.success('Successfully updated password ');
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            
            if (error.error.message === 'Incorrect Password!') {
              this.alertify.error('Incorrect Password! Please provide correct password.');
            } else if (error.error.message === 'Password and Confirm Password do not match!') {
              this.alertify.error('Password and Confirm Password don\'t match!');
            }else {
              this.alertify.error('Server is unavailable. Please try again.');
            }

          } 
        },
        () => {}
      )
      );

    }
  }

  onClose() {
    if (this.changepasswordForm.dirty) {
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

  onClear() {
    this.changepasswordForm.reset();
  }

  populateChangePassword() {
    this.changePassword.oldPassword = this.changepasswordForm.value.currentpassword;
    this.changePassword.newPassword = this.changepasswordForm.value.password;
    this.changePassword.confirmPassword = this.changepasswordForm.value.confirmPassword;
  }

  changePasswordDisabled() {
    return !this.changepasswordForm.valid || !this.comparePasswords() ;
  }

  comparePasswords() {
    if (this.changepasswordForm.value.confirmPassword != null) {
      return this.changepasswordForm.value.password === this.changepasswordForm.value.confirmPassword;
    }
    return false;
  }

  showConfirmPasswordErrorMessage() {
    if (
      this.changepasswordForm != null &&
      this.changepasswordForm.dirty &&
      this.changepasswordForm.value.confirmPassword != null &&
      this.changepasswordForm.value.confirmPassword.toString().length > 0
      ) {
      const password = this.changepasswordForm.value.password;
      const confirmPassword = this.changepasswordForm.value.confirmPassword;
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
