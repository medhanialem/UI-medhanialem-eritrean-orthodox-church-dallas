import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { AuthenticationService } from '../shared/authentication.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  private subscriptions: Subscription [] = [];
  loginForm: FormGroup;
  resetPasswordLabelSuccess = '';
  resetPasswordLabelFailure = '';

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private alertify: AlertifyService,
              private dialog: MatDialog) {

    this.loginForm = fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
   }

  ngOnInit() {
  }

  onLogin() {
    // if (this.loginForm.valid) {
    //   if (this.authService.signIn(this.loginForm.value.userName, this.loginForm.value.password)) {
    //     this.router.navigate(['/']);
    //   } else {
    //     this.alertify.error('Invalid username or password');
    //   }
    // } else {
    //   console.log('invalid form');
    // }
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
        result => {
          if (result === true)  {
          this.router.navigate(['/']);
          } else {
          this.alertify.error('Invalid username or password');
          }
        },
        (error) => {
          console.log(error);
          //this.alertify.error('There is an issue processing your request.');
          this.alertify.error('Invalid username or password');
        },
        () => {
          // on successfully competion - close loading spinner or things which need doing
        }
      );
    } else {
        console.log('invalid form');
      }

  }

  onForgotPasswordBtn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '33%';
    dialogConfig.height = '20%';

    const dialogRef = this.dialog.open(ForgotPasswordComponent, dialogConfig);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'success') {
          this.resetPasswordLabelSuccess = 'Password reset sent to your email.';
          this.resetPasswordLabelFailure = '';
        } else {
          this.resetPasswordLabelFailure = 'Password reset NOT successfull. Please try again.';
          this.resetPasswordLabelSuccess = '';
        }
      },
      (error) => {},
      () => {}
    ));
  }

  onClear() {
    this.loginForm.reset();
    this.resetPasswordLabelSuccess = '';
    this.resetPasswordLabelFailure = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
