import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms' ;

import { Subscription } from 'rxjs';
import { EmailModel } from './email-model';
import { ReceiptsService } from '../receipts.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  sendEmailForm: FormGroup;
  emailModel: EmailModel = new EmailModel();

  constructor(
    private receiptsService: ReceiptsService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    public dialogRef: MatDialogRef<EmailComponent>
    ) {
      this.sendEmailForm = fb.group({email: [data.email, [Validators.required, Validators.email]]});
   }

  ngOnInit() {}

  onClear() {}

  onSendEmail() {
    if (this.sendEmailForm.valid) {
      this.populateEmail();
      this.receiptsService.sendReceiptByEmail(this.emailModel).subscribe(
        (result) => {
          console.log(result);
          this.dialogRef.close(result);
        },
        (error) => {
          console.log(error);
          this.dialogRef.close(false);
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

  populateEmail() {
    this.emailModel.email = this.sendEmailForm.value.email;
    this.emailModel.receiptId = this.data.receiptId;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
