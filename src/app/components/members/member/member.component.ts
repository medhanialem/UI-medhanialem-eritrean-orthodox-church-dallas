import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog, MAT_DIALOG_DATA, MatSelect, MatOption, MatSelectChange } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms' ;

import { MemberService } from '../shared/member.service';
import { NotificationService } from '../shared/notification.service';
import { Member, Tier } from '../member';
import { HttpResponseBase } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { DialogCloseComponent } from '../add-member-dialog-close/dialog-close.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  addMemberForm: FormGroup;
  memberModel: Member;
  tierList$: Observable<Tier[]>;
  selectedTier: Tier = new Tier();
  selectedTierId;
  action;
  @ViewChild('TIER', { static: true }) tierControl: MatSelect;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    public service: MemberService,
    /*private notificationService: NotificationService,*/
    public dialogRef: MatDialogRef<MemberComponent>,
    private dialog: MatDialog/*,
    private authService: AuthenticationService*/) {
      this.memberModel = data.member;
      this.primaryOrDependent = data.primaryOrDependent;
      this.populateDateInputs(this.primaryOrDependent);
      this.action = data.action;
      if (data.member !== null && data.member.tier !== null && data.member.tier.description) {
        this.selectedTier = data.member.tier as Tier;
        this.selectedTierId = data.member.tier.id;
      }
      this.addMemberForm = fb.group({
        firstName: [data.member.firstName, Validators.required],
        middleName: [data.member.middleName, Validators.required],
        lastName: [data.member.lastName, Validators.required],
        gender: [data.member.gender, Validators.required],
        marStatus: [data.member.maritalStatus],
        mobile: [data.member.homePhoneNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        email: [data.member.email, Validators.email],
        streetAddress: [data.member.streetAddress, Validators.required],
        apartment: [data.member.apartmentNo],
        city: [data.member.city, Validators.required],
        state: [data.member.state, Validators.required],
        zipCode: [data.member.zipCode, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        oldChurchId: [data.member.oldChurchId, Validators.maxLength(3)],
        sundaySchool: [data.member.sundaySchool],
        sebekaGubae: [data.member.sebekaGubae],
        // registrationDate: [(undefined !== data.member.registrationDate) ? data.member.registrationDate : new Date(), Validators.required],
        // paymentStartDate: [(undefined !== data.member.paymentStartDate) ? data.member.paymentStartDate : new Date()],
        registrationDate: [this.registrationDateForUI, Validators.required],
        paymentStartDate: [this.paymentStartDateForUI],
        tier: [this.selectedTier, Validators.required]
      });

     }

  // minRegistrationDate = new Date(1980, 0, 1);
  // maxRegistrationDate = new Date();
  registrationDateForUI: Date;
  paymentStartDateForUI: Date;

  maritalStatuses: any[] = [
    {value: 'SINGLE', displayValue: 'Single'},
    {value: 'MARRIED', displayValue: 'Married'},
    {value: 'WIDOWED', displayValue: 'Widowed'},
    {value: 'DIVORCED', displayValue: 'Divorced'}
  ];
  primaryOrDependent;

  ngOnInit() {
    this.getTierList();
    //this.enableDisableRegistrationDate();
  }

  onClear() {

  }

  onTierSelected(event: MatSelectChange) {
    //this.selectedTier = event.source.value;
    this.selectedTier.description = (event.source.selected as MatOption).viewValue;
  }

  getTierList() {

    this.tierList$ = new Observable<Tier[]>();
    this.tierList$ = this.service.getTierList().pipe(
      map(
        res => {
          return res;
        }
      )
    );
  }

  onSubmit() {

    if (this.addMemberForm.valid) {
      this.mapMemberDialogToMemberObject();
      this.service.saveMember(this.memberModel, this.action).subscribe(
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

  formValid() {
   return this.addMemberForm.invalid;
  }

  mapMemberDialogToMemberObject() {
    this.memberModel.tier = this.selectedTier;
    this.memberModel.firstName = this.addMemberForm.value.firstName;
    this.memberModel.middleName = this.addMemberForm.value.middleName;
    this.memberModel.lastName = this.addMemberForm.value.lastName;
    this.memberModel.gender = this.addMemberForm.value.gender;
    this.memberModel.maritalStatus = this.addMemberForm.value.marStatus;
    this.memberModel.email = this.addMemberForm.value.email;
    this.memberModel.homePhoneNo = this.addMemberForm.value.mobile;
    this.memberModel.streetAddress = this.addMemberForm.value.streetAddress;
    this.memberModel.apartmentNo = this.addMemberForm.value.apartment;
    this.memberModel.city = this.addMemberForm.value.city;
    this.memberModel.state = this.addMemberForm.value.state;
    this.memberModel.zipCode = this.addMemberForm.value.zipCode;
    this.memberModel.sebekaGubae = this.addMemberForm.value.sebekaGubae;
    this.memberModel.sundaySchool = this.addMemberForm.value.sundaySchool;
    this.memberModel.churchId = this.data.member.churchId;
    this.memberModel.oldChurchId = this.addMemberForm.value.oldChurchId;
    this.memberModel.registrationDate = this.addMemberForm.value.registrationDate;
    this.memberModel.paymentStartDate = this.addMemberForm.value.paymentStartDate;
    if (this.data.parentId !== undefined) {
      this.memberModel.superId = this.data.parentId;
    }

    console.log(this.memberModel);
    //if (!(this.memberModel.memberId > 0)) {
      //this.memberModel.registrationDate = this.addMemberForm.value.registrationDate;
      //this.memberModel.createdBy = this.authService.decodedToken().userId;
      //this.memberModel.createdDate = new Date();
      //this.memberModel.updatedBy = this.authService.decodedToken().userId;
      //this.memberModel.updatedDate = new Date();
   //} else {
     //this.memberModel.updatedBy = this.authService.decodedToken().userId;
     //this.memberModel.updatedDate = new Date();
   //}
  }

  populateDateInputs(primaryOrDependent: string) {
    if (primaryOrDependent === 'primary') {
      this.registrationDateForUI = this.memberModel.memberId > 0 ? new Date(this.memberModel.registrationDate) : new Date();
      this.paymentStartDateForUI = this.memberModel.memberId > 0 && null != this.memberModel.paymentStartDate ? 
      new Date(this.memberModel.paymentStartDate) : new Date();
    } else if (primaryOrDependent === 'dependent') {
      this.registrationDateForUI = null != this.memberModel.registrationDate ? new Date(this.memberModel.registrationDate) : new Date();
      this.paymentStartDateForUI = null;
    }
  }

  // enableDisableRegistrationDate() {
  //   const ctrl = this.addMemberForm.get('registrationDate');
  //   !(this.memberModel.memberId > 0) ? ctrl.enable() : ctrl.disable();
  // }
}
