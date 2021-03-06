import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms' ;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../members/shared/notification.service';
import { Member } from '../members/member';
import { DialogCloseComponent } from '../members/add-member-dialog-close/dialog-close.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Member[],
    public dialogRef: MatDialogRef<MessageComponent>,
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialog: MatDialog) {
      data.forEach(member => {
        this.phoneNumbersList.push(member.homePhoneNo);
      });
    }


  phoneNumbersList: Array<string> = [];
  smsTextObject: any;

  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  ngOnInit() {
  }

  onSubmit() {
    if (this.messageForm.valid) {

        this.smsTextObject = {
          phoneNumbers: this.data,
          message: this.messageForm.value.message
        };
      }

    console.log('Request###########', this.smsTextObject);

    this.http.post('http://localhost:8091/api/v1/sms/Churchmembers', this.smsTextObject, this.httpOptions)
       .subscribe(
        (val) => {
            console.log('POST call successful value returned in body',
                        val);
        },
        response => {
            console.log('POST call in error', response);
        },
        () => {
            console.log('The POST observable is now completed.');
        });


    this.messageForm.reset();
    this.initializeFormGroup();
    this.onClose();
    this.notificationService.success(':: Sent successfully');
  }

  onClear() {
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.messageForm.setValue({
      message: ''
    });
  }

  // onClose() {
  //   this.dialogRef.close();
  // }

  onClose() {
    if (this.messageForm.dirty) {
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

}
