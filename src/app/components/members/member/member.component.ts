import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms' ;

import { MemberService } from '../shared/member.service';
import { NotificationService } from '../shared/notification.service';
import { AddMemberDialogCloseComponent } from '../add-member-dialog-close/add-member-dialog-close.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(public service: MemberService, 
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<MemberComponent>,
    private dialog: MatDialog) { }

  displayRelationship: boolean = false;
  checkedDependent: boolean = false;
  minRegistrationDate = new Date(1980, 0, 1);;
  maxRegistrationDate = new Date();

  relationships = [
    {id: 1, value: 'Wife'},
    {id: 2, value: 'Husband'},
    {id: 3, value: 'Son'},
    {id: 4, value: 'Daughter'},
    {id: 5, value: 'Wife'},
    {id: 6, value: 'Brother'},
    {id: 7, value: 'Sister'},
    {id: 8, value: 'Father'},
    {id: 9, value: 'Mother'},
    {id: 10, value: 'Uncle'},
    {id: 11, value: 'Aunt'},
    {id: 12, value: 'Sister in law'},
    {id: 13, value: 'Brother in law'},
    {id: 14, value: 'Father in law'},
    {id: 15, value: 'Mother in law'},
    {id: 16, value: 'Relative'},
    {id: 17, value: 'Not relative'}
  ];

  ngOnInit() {
  }

  onClear(){
    //this.service.form.reset();
    //this.service.initializeFormGroup();
  }

  onSubmit(){
    // if (this.service.form.valid){
    //   if (!this.service.form.get('$key').value)
    //     this.service.insertMember(this.service.form.value);
    //   else
    //     this.service.updateMember(this.service.form.value);
    //   this.service.form.reset();
    //   this.service.initializeFormGroup();
    //   this.notificationService.success(':: Submitted successfully');
    //   this.onClose();
    // }
  }
  
  onClose(){
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    // this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    let dialogRef = this.dialog.open(AddMemberDialogCloseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "yes") {
        this.dialogRef.close(null);
      }
    });
  }

  displayRelationshipOnOff(obj) {
    this.displayRelationship = obj;
    if (this.displayRelationship){
      this.checkedDependent = false;
    }
  }

  addMemberForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dependency: new FormControl('1'),
    relationship: new FormControl('1'),
    gender: new FormControl('1'),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl(''),
    email: new FormControl('', Validators.email),
    registrationDate: new FormControl('', Validators.required),
    isSundaySchoolMember: new FormControl(),
    isSebekaGubae: new FormControl()
  });

}