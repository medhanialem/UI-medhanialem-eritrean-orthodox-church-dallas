import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms' ;

import { MemberService } from '../shared/member.service';
import { NotificationService } from '../shared/notification.service';
import { AddMemberDialogCloseComponent } from '../add-member-dialog-close/add-member-dialog-close.component';
import { Member } from '../member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  addMemberForm: FormGroup;
  memberModel: Member;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Member,
    public service: MemberService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<MemberComponent>,
    private dialog: MatDialog) {
      this.memberModel = data;
      this.addMemberForm = fb.group({
        firstName: [data.firstName, Validators.required],
        middleName: [data.middleName, Validators.required],
        lastName: [data.lastName, Validators.required],
        gender: [data.gender, Validators.required],
        mobile: [data.homePhoneNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        email: [data.email, Validators.email],
        streetAddress: [data.streetAddress, Validators.required],
        apartment: [data.apartmentNo],
        city: [data.city, Validators.required],
        state: [data.state, Validators.required],
        zipCode: [data.zipCode, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        sundaySchool: [data.sundaySchool],
        sebekaGubae: [data.sebekaGubae],
        registrationDate: [data.registrationDate, Validators.required]

      });

     }

  minRegistrationDate = new Date(1980, 0, 1);
  maxRegistrationDate = new Date();



  ngOnInit() {

  }

  onClear() {

  }

  onSubmit() {

    if (this.addMemberForm.valid) {
      this.mapMemberDialogToMemberObject();
      this.service.saveMember(this.memberModel).subscribe(
        () => {
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('form not valid!');
    }
  }

  onClose() {
    if (this.addMemberForm.dirty) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '30%';
      const dialogRef = this.dialog.open(AddMemberDialogCloseComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          this.dialogRef.close(null);
        }
      });
    } else {
      this.dialogRef.close(null);
    }
  }

  formValid() {
   return this.addMemberForm.invalid;
  }

  mapMemberDialogToMemberObject() {
    this.memberModel.firstName = this.addMemberForm.value.firstName;
    this.memberModel.middleName = this.addMemberForm.value.middleName;
    this.memberModel.lastName = this.addMemberForm.value.lastName;
    this.memberModel.gender = this.addMemberForm.value.gender;
    this.memberModel.email = this.addMemberForm.value.email;
    this.memberModel.homePhoneNo = this.addMemberForm.value.mobile;
    this.memberModel.streetAddress = this.addMemberForm.value.streetAddress;
    this.memberModel.apartmentNo = this.addMemberForm.value.apartment;
    this.memberModel.city = this.addMemberForm.value.city;
    this.memberModel.state = this.addMemberForm.value.state;
    this.memberModel.zipCode = this.addMemberForm.value.zipCode;
    this.memberModel.sebekaGubae = this.addMemberForm.value.sebekaGubae;
    this.memberModel.sundaySchool = this.addMemberForm.value.sundaySchool;

    if (!(this.memberModel.memberId > 0)) {
      this.memberModel.registrationDate = this.addMemberForm.value.registrationDate;
      this.memberModel.createdBy = 0;
      this.memberModel.createdDate = new Date();
      this.memberModel.updatedBy = 0;
      this.memberModel.updatedDate = new Date();
   } else {
     this.memberModel.updatedBy = 0;
     this.memberModel.updatedDate = new Date();
   }
  }
}
