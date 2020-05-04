import { Component, Inject, OnInit } from '@angular/core';
import { MemberService } from '../shared/member.service';
import { MatDialogRef, MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms' ;
import { DialogCloseComponent } from '../add-member-dialog-close/dialog-close.component';
import { Member } from '../member';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-move-member',
  templateUrl: './move-member.component.html',
  styleUrls: ['./move-member.component.css']
})
export class MoveMemberComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data,
    public service: MemberService,
    public dialogRef: MatDialogRef<MoveMemberComponent>,
    private dialog: MatDialog
  ) {
    this.memberToBeMovedFullName = data.memberToBeMovedFullName;
    this.moveMemberForm = fb.group({
      memberToBeMovedToId: [this.memberToBeMovedToId, Validators.required]
    });
  }

  private subscriptions: Subscription[] = [];
  moveMemberForm: FormGroup;
  memberToBeMovedToId: number;
  memberToBeMovedFullName: string;
  dependentsMemberToBeMoved: Member[] = null;
  dependentsMemberToBeMovedTo: Member[] = null;
  memberToBeMovedToDropDown: any[] = null;
  memberToBeMovedToDropDownFormated = [];
  memberToBeMovedToDropDownFormatedSorted = [];

  ngOnInit() {
    this.populateMemberToBeMovedFullDetail(this.data.memberToBeMovedId, 'memberToBeMoved');
    this.populateMemberToBeMovedToDropDown();
  }

  populateMemberToBeMovedFullDetail(memberId, actionOn: string) {
    if (actionOn === 'memberToBeMoved') {
      this.dependentsMemberToBeMoved = null;
    } else if (actionOn === 'memberToBeMovedTo') {
      this.dependentsMemberToBeMovedTo = null;
    }
    this.subscriptions.push(this.service.getDependentsList(actionOn === 'memberToBeMoved' ? memberId : memberId.value).subscribe(
        (
          response => {
            if (response != null) {
              if (actionOn === 'memberToBeMoved') {
                this.dependentsMemberToBeMoved = response as Member[];
              } else if (actionOn === 'memberToBeMovedTo') {
                this.dependentsMemberToBeMovedTo = response as Member[];
                this.memberToBeMovedToId = memberId.value;
              }
            } else {
              if (actionOn === 'memberToBeMoved') {
                this.dependentsMemberToBeMoved = null;
              } else if (actionOn === 'memberToBeMovedTo') {
                this.dependentsMemberToBeMovedTo = null;
                this.memberToBeMovedToId = null;
              }
            }
          }),
        (
          error => {
            console.log(error.message);
          }),
          () => {
          }

      ));
  }

  populateMemberToBeMovedToDropDown() {
    // tslint:disable-next-line: new-parens
    this.memberToBeMovedToDropDown = [];
    this.subscriptions.push(this.service.getMemberList().subscribe(
        (
          response => {
            if (response != null) {
              this.memberToBeMovedToDropDown = response as Member[];
              for (let i = 0; i < this.memberToBeMovedToDropDown.length; i++) {
                if (this.memberToBeMovedToDropDown[i].memberId !== this.data.memberToBeMovedId) {
                  this.memberToBeMovedToDropDownFormated.push({
                    value: this.memberToBeMovedToDropDown[i].memberId,
                    viewValue: this.memberToBeMovedToDropDown[i].firstName + ' ' +
                    this.memberToBeMovedToDropDown[i].middleName + ' ' +
                    this.memberToBeMovedToDropDown[i].lastName
                 });
                }
              }
              this.sortMemberToBeMovedToDropDown();
            } else {
              this.memberToBeMovedToDropDown = null;
            }
          }),
        (
          error => {
            console.log(error.message);
          }),
          () => {
          }
      ));
  }

  sortMemberToBeMovedToDropDown() {
    this.memberToBeMovedToDropDownFormatedSorted = this.memberToBeMovedToDropDownFormated.sort((a, b) => {
      if (a.viewValue < b.viewValue) { return -1; }
      if (a.viewValue > b.viewValue) { return 1; }
    });
  }

  onSubmit() {
    if (this.moveMemberForm.valid) {
      this.service.moveMember(this.data.memberToBeMovedId, 'move', this.memberToBeMovedToId).subscribe(
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
    if (this.moveMemberForm.dirty) {
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
    return this.moveMemberForm.invalid;
   }

   ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}

// @Pipe({name: 'OrderBy'})
// export class OrderByPipe implements PipeTransform {
//   transform(records: Array<any>, key: string) {
//     return records.sort(function(itemA, itemB){
//       if (itemA[key] > itemB[key]) {
//         return 1;
//       } else if (itemA[key] < itemB[key]) {
//           return -1;
//       } else {
//           return 0;
//       }
//     });
//   }
// }
