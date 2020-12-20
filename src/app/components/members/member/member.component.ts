import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog, MAT_DIALOG_DATA, MatSelect, MatOption, MatSelectChange } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms' ;

import { MemberService } from '../shared/member.service';
import { NotificationService } from '../shared/notification.service';
import { Member, Tier } from '../member';
import { HttpResponseBase } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { DialogCloseComponent } from '../add-member-dialog-close/dialog-close.component';
import { TierService } from 'src/app/tiers/tier.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  addMemberForm: FormGroup;
  memberModel: Member;
  tierList$: Observable<Tier[]>;
  selectedTier: Tier = new Tier();
  selectedTierId;
  action;
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('TIER', { static: true }) tierControl: MatSelect;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    public service: MemberService,
    public tierService: TierService,
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
      if (null !== data.member && null !== data.member.fatherPriest && undefined !== data.member.fatherPriest) {
        this.selectedPriestFatherId = data.member.fatherPriest.memberId;
      }

      if (this.action === 'save' && this.primaryOrDependent === 'dependent') {
        this.selectedPriestFatherId = data.selectedParent.fatherPriest.memberId;
      }
      this.selectedRelationship = data.member.relationship;
      this.addMemberForm = fb.group({
        firstName: [data.member.firstName, Validators.required],
        middleName: [data.member.middleName],
        lastName: [data.member.lastName, Validators.required],
        gender: [data.member.gender, Validators.required],
        marStatus: [data.member.maritalStatus, Validators.required],
        // mobile: [data.member.homePhoneNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        mobile: [this.action === 'save' && this.primaryOrDependent === 'dependent' ?
                        data.selectedParent.homePhoneNo : data.member.homePhoneNo, [Validators.required, Validators.minLength(14)]],
        email: [data.member.email, Validators.email],
        streetAddress: [this.action === 'save' && this.primaryOrDependent === 'dependent' ?
                data.selectedParent.streetAddress : data.member.streetAddress, Validators.required],
        apartment: [this.action === 'save' && this.primaryOrDependent === 'dependent' ?
                data.selectedParent.apartmentNo : data.member.apartmentNo],
        city: [this.action === 'save' && this.primaryOrDependent === 'dependent' ?
                data.selectedParent.city : data.member.city, Validators.required],
        state: [this.action === 'save' && this.primaryOrDependent === 'dependent' ?
                data.selectedParent.state : data.member.state, Validators.required],
        zipCode: [this.action === 'save' && this.primaryOrDependent === 'dependent' ?
              data.selectedParent.zipCode : data.member.zipCode, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        oldChurchId: [data.member.oldChurchId, Validators.maxLength(3)],
        sundaySchool: [data.member.sundaySchool],
        sebekaGubae: [data.member.sebekaGubae],
        registrationDate: [this.registrationDateForUI, Validators.required],
        paymentStartDate: [this.paymentStartDateForUI],
        tier: [this.selectedTier, Validators.required],
        relationship: [this.selectedRelationship],
        fatherPriest: [this.selectedPriestFatherId]
      });

     }

  // minRegistrationDate = new Date(1980, 0, 1);
  // maxRegistrationDate = new Date();
  registrationDateForUI: Date;
  paymentStartDateForUI: Date;

  maritalStatuses: MaritalStatus[] = [
    {value: 'SINGLE', displayValue: 'Single'},
    {value: 'MARRIED', displayValue: 'Married'},
    {value: 'WIDOWED', displayValue: 'Widowed'},
    {value: 'DIVORCED', displayValue: 'Divorced'}
  ];

  primaryOrDependent;

  relationships: Relationship[] = [
    {value: 'Spouse', displayValue: 'Spouse'},
    {value: 'Son', displayValue: 'Son'},
    {value: 'Daughter', displayValue: 'Daughter'},
    {value: 'Father', displayValue: 'Father'},
    {value: 'Mother', displayValue: 'Mother'},
    {value: 'Brother', displayValue: 'Brother'},
    {value: 'Sister', displayValue: 'Sister'},
    {value: 'Uncle', displayValue: 'Uncle'},
    {value: 'Aunt', displayValue: 'Aunt'},
    {value: 'Father In Law', displayValue: 'Father In Law'},
    {value: 'Mother In Law', displayValue: 'Mother In Law'},
    {value: 'Relative', displayValue: 'Relative'},
    {value: 'Other', displayValue: 'Other'}
  ];

  priestFathersDropdownJSON: PreistFathersDropdownJSONFormat[] = [];

  selectedRelationship: string;
  priestFathers: Member[];
  selectedPriestFatherId: number;
  priestFatherMemberObject;

  ngOnInit() {
    this.getTierList();
    this.getPriestFathersList();
    if (this.action === 'save' && this.primaryOrDependent === 'dependent') {
      this.selectDefaultDependentTier();
    }
    //this.enableDisableRegistrationDate();
  }

  onClear() {

  }

  selectDefaultDependentTier() {
    this.tierList$.subscribe(
      (t) => {
        for(let i = 0; i < t.length; i++) {
          if (t[i].description === 'Dependent') {
            this.selectedTier = t[i];
            break;
          }
        }
     });
  }

  onTierSelected(event: MatSelectChange) {
    //this.selectedTier = event.source.value;
    this.selectedTier.description = (event.source.selected as MatOption).viewValue;
  }

  onRelationshipSelected(event) {
    this.selectedRelationship = event.value;
  }

  onPriestFatherSelected(event) {
    this.selectedPriestFatherId = event.value;
  }

  getTierList() {

    this.tierList$ = new Observable<Tier[]>();
    this.tierList$ = this.tierService.getTierList().pipe(
      map(
        res => {
          return res;
        }
      )
    );
  }

  getPriestFathersList() {
    this.subscriptions.push(this.service.getPriestFathersList().subscribe(
        (
          response => {
            if (response != null) {
              this.priestFathers = response as Member[];
            } else {
              this.priestFathers = [];
            }
            this.populatePriestFathersDropdownJSON();
          }),
        (
          error => {
            console.log(error.message);
          }),
          () => {
          }

      ));
  }

  populatePriestFathersDropdownJSON() {
    this.priestFathersDropdownJSON.push(
      {
        value: -1,
        displayValue: 'Please select a priest.'
      }
    );

    for(let i = 0; i < this.priestFathers.length; i++) {
      this.priestFathersDropdownJSON.push(
        {
          value: this.priestFathers[i].memberId,
          displayValue: this.priestFathers[i].firstName + ' ' + this.priestFathers[i].middleName + ' ' + this.priestFathers[i].lastName
        }
      );
    }
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
    this.buildPriestFatherMemberObject();
    this.memberModel.fatherPriest = this.priestFatherMemberObject;
    this.memberModel.relationship = this.selectedRelationship;

    if (this.data.parentId !== undefined) {
      this.memberModel.superId = this.data.parentId;
    }

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

  buildPriestFatherMemberObject() {
    for(let i=0; i < this.priestFathers.length; i++){
      if (this.priestFathers[i].memberId === this.selectedPriestFatherId) {
        this.priestFatherMemberObject = this.priestFathers[i];
        break;
      }
    }
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}

interface MaritalStatus {
  value: string;
  displayValue: string;
}

interface Relationship {
  value: string;
  displayValue: string;
}

interface PreistFathersDropdownJSONFormat {
  value: number;
  displayValue: string;
}
