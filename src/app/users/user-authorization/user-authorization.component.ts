import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.css']
})
export class UserAuthorizationComponent implements OnInit {

  authorizeForm: FormGroup;
  displayWarning;
  subjectName;
  subject;
  btnActionLabel;
  alertifySuccess;
  alertifyError;
  loginSuccess = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<UserAuthorizationComponent>) {
      this.authorizeForm = fb.group({
        userName: new FormControl({value: authenticationService.decodedToken().sub, disabled: true}),
        password: [null, [Validators.required, Validators.minLength(5)]]
    });
      this.displayWarning = data.displayWarning;
      this.subjectName = data.subjectName;
      this.subject = data.subject;
      this.btnActionLabel = data.btnActionLabel;
  }

  ngOnInit() {

  }

  onConfirm() {

    if (this.authorizeForm.valid) {
      this.authenticationService.signIn(this.authenticationService.decodedToken().sub, this.authorizeForm.value.password).subscribe(
        (result) => {
          this.onClose(true);
        },
        (error) => {
          console.log(error);
          this.onClose(false);
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  confirmBtnDisabled() {
    return !this.authorizeForm.valid;
  }

  onClose(flag): void {
    this.dialogRef.close(flag);
  }

}
