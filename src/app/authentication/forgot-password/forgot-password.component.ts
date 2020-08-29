import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms' ;

import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  sendEmailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private authService: AuthenticationService,
    ) {
      this.sendEmailForm = fb.group({email: [null, [Validators.required, Validators.email]]});
   }

  ngOnInit() {
    this.dialogRef.updatePosition({ top: '34%', left: '32%' });
  }

  onClear() {}

  onSendEmail() {
    if (this.sendEmailForm.valid) {
      this.authService.forgotPassword(this.sendEmailForm.value.email).subscribe(
        (result) => {
          console.log(result);
          // this.dialogRef.close('<label class = "resetSuccessLabel">Password reset sent to your email.</label>');
          this.dialogRef.close('success');
        },
        (error) => {
          console.log(error);
          // this.dialogRef.close('<label class = "resetFailureLabel" style="color: red;">Password reset NOT successfull. Please try again.</label>');
          this.dialogRef.close('failed');
        }
      );
    } else {
      console.log('form not valid!');
    }
  }

  onClose() {
    this.dialogRef.close('Dont send email.');
  }

  formValid() {
   return this.sendEmailForm.invalid;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
