import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  private subscriptions: Subscription [] = [];
  loginForm: FormGroup;
  resetPasswordLabelSuccess = '';
  resetPasswordLabelFailure = '';
  urlToken = '';

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private alertify: AlertifyService,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {

    this.loginForm = fb.group({
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null]
    });
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.urlToken = params['token'];
      console.log('token:' + params['token']);
    });
  }

  onResetPassword() {
    if (this.loginForm.valid) {
      this.authService.resetPassword(this.urlToken, this.loginForm.value.password, this.loginForm.value.confirmPassword).subscribe(
        result => {
          if (result['operationResult'] === 'SUCCESS')  {
            this.alertify.success('Password Reset Successful.');
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.log(error);
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

  onClear() {
    this.loginForm.reset();
    this.resetPasswordLabelSuccess = '';
    this.resetPasswordLabelFailure = '';
  }

  saveUserDisabled() {
    return !this.loginForm.valid || !this.comparePasswords() ;
  }

  comparePasswords() {
    if (this.loginForm.value.confirmPassword != null) {
      return this.loginForm.value.password === this.loginForm.value.confirmPassword;
    }
    return false;
  }

  showConfirmPasswordErrorMessage() {
    if (
      this.loginForm != null &&
      this.loginForm.dirty &&
      this.loginForm.value.confirmPassword != null &&
      this.loginForm.value.confirmPassword.toString().length > 0
      ) {
      const password = this.loginForm.value.password;
      const confirmPassword = this.loginForm.value.confirmPassword;
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
