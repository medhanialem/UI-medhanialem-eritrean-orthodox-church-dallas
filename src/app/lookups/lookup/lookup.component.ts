import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCloseComponent } from 'src/app/components/members/add-member-dialog-close/dialog-close.component';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { LookupModel } from '../lookups.model';
import { LookupsService } from '../lookups.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  registrationForm: FormGroup;
  lookupsModel: LookupModel[] = [];
  lookupsModelForCreate: LookupModel[] = [];
  lookupsModelForUpdate: LookupModel[] = [];

  tierId;
  action;
  selectedTierDescription;
  year;

  janInputAmount;
  febInputAmount;
  marInputAmount;
  aprInputAmount;
  mayInputAmount;
  junInputAmount;
  julInputAmount;
  augInputAmount;
  sepInputAmount;
  octInputAmount;
  novInputAmount;
  decInputAmount;
  amountInputGeneral;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LookupComponent>,
    private lookupService: LookupsService,
    private alertify: AlertifyService) {
      if (data.action === 'update') {
        this.lookupsModel = data.lookups;
      }
      this.tierId = data.tierId;
      this.action = data.action;
      this.selectedTierDescription = data.selectedTierDescription;
      this.year = data.selectedYear;
      this.populateMonthsAmount();

      this.registrationForm = fb.group({
        janInputAmount: new FormControl({value: this.janInputAmount, disabled: this.disableInputField(1)}, [Validators.required]),
        febInputAmount: new FormControl({value: this.febInputAmount, disabled: this.disableInputField(2)}, [Validators.required]),
        marInputAmount: new FormControl({value: this.marInputAmount, disabled: this.disableInputField(3)}, [Validators.required]),
        aprInputAmount: new FormControl({value: this.aprInputAmount, disabled: this.disableInputField(4)}, [Validators.required]),
        mayInputAmount: new FormControl({value: this.mayInputAmount, disabled: this.disableInputField(5)}, [Validators.required]),
        junInputAmount: new FormControl({value: this.junInputAmount, disabled: this.disableInputField(6)}, [Validators.required]),
        julInputAmount: new FormControl({value: this.julInputAmount, disabled: this.disableInputField(7)}, [Validators.required]),
        augInputAmount: new FormControl({value: this.augInputAmount, disabled: this.disableInputField(8)}, [Validators.required]),
        sepInputAmount: new FormControl({value: this.sepInputAmount, disabled: this.disableInputField(9)}, [Validators.required]),
        octInputAmount: new FormControl({value: this.octInputAmount, disabled: this.disableInputField(10)}, [Validators.required]),
        novInputAmount: new FormControl({value: this.novInputAmount, disabled: this.disableInputField(11)}, [Validators.required]),
        decInputAmount: new FormControl({value: this.decInputAmount, disabled: this.disableInputField(12)}, [Validators.required]),
        amountInputGeneral: new FormControl({value: this.amountInputGeneral, disabled: this.disableInputField(12)})
      });
  }

  ngOnInit() {}

  populateMonthsAmount() {
    for (let i = 0; i < this.lookupsModel.length; i++) {
      if (this.lookupsModel[i].month === 1) {
        this.janInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 2) {
        this.febInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 3) {
        this.marInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 4) {
        this.aprInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 5) {
        this.mayInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 6) {
        this.junInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 7) {
        this.julInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 8) {
        this.augInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 9) {
        this.sepInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 10) {
        this.octInputAmount = this.lookupsModel[i].amount;
      } else if (this.lookupsModel[i].month === 11) {
        this.novInputAmount = this.lookupsModel[i].amount;
      } else {
        this.decInputAmount = this.lookupsModel[i].amount;
      }
    }
  }

  updateFields() {
    const currentMonth = new Date().getMonth() + 1;

    if ((new Date().getFullYear() < this.year || this.action === 'save') || (new Date().getFullYear() < this.year && this.action === 'update')) {
      this.janInputAmount = this.registrationForm.value.amountInputGeneral;
      this.febInputAmount = this.registrationForm.value.amountInputGeneral;
      this.marInputAmount = this.registrationForm.value.amountInputGeneral;
      this.aprInputAmount = this.registrationForm.value.amountInputGeneral;
      this.mayInputAmount = this.registrationForm.value.amountInputGeneral;
      this.junInputAmount = this.registrationForm.value.amountInputGeneral;
      this.julInputAmount = this.registrationForm.value.amountInputGeneral;
      this.augInputAmount = this.registrationForm.value.amountInputGeneral;
      this.sepInputAmount = this.registrationForm.value.amountInputGeneral;
      this.octInputAmount = this.registrationForm.value.amountInputGeneral;
      this.novInputAmount = this.registrationForm.value.amountInputGeneral;
      this.decInputAmount = this.registrationForm.value.amountInputGeneral;
    } else {
      // if (currentMonth === 1) {
      //   this.janInputAmount = this.registrationForm.value.amountInputGeneral;
      // }
      if (currentMonth < 2) {
        this.febInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 3) {
        this.marInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 4) {
        this.aprInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 5) {
        this.mayInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 6) {
        this.junInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 7) {
        this.julInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 8) {
        this.augInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 9) {
        this.sepInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 10) {
        this.octInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 11) {
        this.novInputAmount = this.registrationForm.value.amountInputGeneral;
      }
      if (currentMonth < 12) {
        this.decInputAmount = this.registrationForm.value.amountInputGeneral;
      }
    }
  }

  populateLookupsForCreate() {
    for (let i = 1; i < 13; i++) {
      const lookupModel: LookupModel = new LookupModel();
      switch (i) {
        case 1: {
          lookupModel.month = 1;
          lookupModel.year = this.year;
          lookupModel.amount = this.janInputAmount;
          break;
        }
        case 2: {
          lookupModel.month = 2;
          lookupModel.year = this.year;
          lookupModel.amount = this.febInputAmount;
          break;
        }
        case 3: {
          lookupModel.month = 3;
          lookupModel.year = this.year;
          lookupModel.amount = this.marInputAmount;
          break;
        }
        case 4: {
          lookupModel.month = 4;
          lookupModel.year = this.year;
          lookupModel.amount = this.aprInputAmount;
          break;
        }
        case 5: {
          lookupModel.month = 5;
          lookupModel.year = this.year;
          lookupModel.amount = this.mayInputAmount;
          break;
        }
        case 6: {
          lookupModel.month = 6;
          lookupModel.year = this.year;
          lookupModel.amount = this.junInputAmount;
          break;
        }
        case 7: {
          lookupModel.month = 7;
          lookupModel.year = this.year;
          lookupModel.amount = this.julInputAmount;
          break;
        }
        case 8: {
          lookupModel.month = 8;
          lookupModel.year = this.year;
          lookupModel.amount = this.augInputAmount;
          break;
        }
        case 9: {
          lookupModel.month = 9;
          lookupModel.year = this.year;
          lookupModel.amount = this.sepInputAmount;
          break;
        }
        case 10: {
          lookupModel.month = 10;
          lookupModel.year = this.year;
          lookupModel.amount = this.octInputAmount;
          break;
        }
        case 11: {
          lookupModel.month = 11;
          lookupModel.year = this.year;
          lookupModel.amount = this.novInputAmount;
          break;
        }
        case 12: {
          lookupModel.month = 12;
          lookupModel.year = this.year;
          lookupModel.amount = this.decInputAmount;
          break;
        }
      }
      this.lookupsModelForCreate.push(lookupModel);
    }
  }

  // Update ONLY updated amounts
  populateLookupsForUpdate() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < this.lookupsModel.length; i++) {
      const lookupModel: LookupModel = new LookupModel();
      let monthMatchFlag = false;

      lookupModel.month = i + 1;
      lookupModel.year = this.year;
      lookupModel.id = this.lookupsModel[i].id;
      lookupModel.tier = this.lookupsModel[i].tier;
      lookupModel.revision = this.lookupsModel[i].revision;
      lookupModel.createdBy = this.lookupsModel[i].createdBy;
      lookupModel.createdAt = this.lookupsModel[i].createdAt;

      switch (i) {
        case 0: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.janInputAmount) {
            lookupModel.amount = this.janInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 1: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.febInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.febInputAmount)) {
            lookupModel.amount = this.febInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 2: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.marInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.marInputAmount)) {
            lookupModel.amount = this.marInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 3: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.aprInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.aprInputAmount)) {
            lookupModel.amount = this.aprInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 4: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.mayInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.mayInputAmount)) {
            lookupModel.amount = this.mayInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 5: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.junInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.junInputAmount)) {
            lookupModel.amount = this.junInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 6: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.julInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.julInputAmount)) {
            lookupModel.amount = this.julInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 7: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.augInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.augInputAmount)) {
            lookupModel.amount = this.augInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 8: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.sepInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.sepInputAmount)) {
            lookupModel.amount = this.sepInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 9: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.octInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.octInputAmount)) {
            lookupModel.amount = this.octInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 10: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.novInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.novInputAmount)) {
            lookupModel.amount = this.novInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
        case 11: {
          if (currentYear < this.year && this.lookupsModel[i].amount !== this.decInputAmount ||
                    (currentMonth < i && this.lookupsModel[i].amount !== this.decInputAmount)) {
            lookupModel.amount = this.decInputAmount;
            monthMatchFlag = true;
          }
          break;
        }
      }
      if (monthMatchFlag) {
        this.lookupsModelForUpdate.push(lookupModel);
      }
    }
  }

  formatCurrencyField(event) {
    const uy = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(event.target.value);
    this.amountInputGeneral = uy;
  }

  disableInputField(month: number): boolean {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (this.year > currentYear) {
      return false;
    } else if (this.year < currentYear) {
      return true;
    } else if (this.year === currentYear && month <= currentMonth && this.action === 'update') {
      return true;
    } else {
      return false;
    }
  }

  onSaveOrUpdate() {
    console.log('Inside edit onSaveOrUpdate()');
    if (this.registrationForm.valid) {
      if (this.action === 'save') {
        this.populateLookupsForCreate();
        console.log(this.lookupsModelForCreate);
      } else {
        console.log('Inside edit lookup:->>>>');
        this.populateLookupsForUpdate();
        console.log(this.lookupsModelForUpdate);
      }
      this.lookupService.addLookUps(
        this.action === 'save' ? this.lookupsModelForCreate : this.lookupsModelForUpdate, this.tierId, this.action)
      .subscribe(
        (result) => {
          console.log(result);
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          console.log(error.message);
          this.alertify.error(error.error.description);
          this.dialogRef.close(false);
        },
        () => {}
      );

    }
  }

  onClose() {
    if (this.registrationForm.dirty) {
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

  saveLookupDisabled() {
    return !this.registrationForm.valid || !this.registrationForm.dirty;
  }

}
