import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCloseComponent } from 'src/app/components/members/add-member-dialog-close/dialog-close.component';
import { TierModel } from '../tier.model';
import { TierService } from '../tier.service';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-tier',
  templateUrl: './tier.component.html',
  styleUrls: ['./tier.component.css']
})
export class TierComponent implements OnInit {

  registrationForm: FormGroup;
  tierModel: TierModel = new TierModel();
  description;
  action;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TierComponent>,
    private tierService: TierService,
    private alertify: AlertifyService) {
      if (null !== data) {
        this.tierModel = data.tier;
        this.action = data.action;
        this.description = data.tier.description;
      } else {
        this.action = 'save';
      }
      this.registrationForm = fb.group({
        description: [this.description, [Validators.required, Validators.minLength(3)]]
      });
  }

  ngOnInit() {}

  onSaveOrUpdate() {
    if (this.registrationForm.valid) {
      this.populateTier();
      this.tierService.addTier(this.tierModel, this.action).subscribe(
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

  populateTier() {
    this.tierModel.description = this.registrationForm.value.description;
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

  saveTierDisabled() {
    return !this.registrationForm.valid || !this.registrationForm.dirty;
  }

}
