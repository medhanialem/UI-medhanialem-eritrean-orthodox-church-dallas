import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { MemberService } from '../shared/member.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(private service: MemberService, 
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<MemberComponent>) { }

  displayRelationship: boolean = false;
  checkedDependent: boolean = false;

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
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if (this.service.form.valid){
      if (!this.service.form.get('$key').value)
        this.service.insertMember(this.service.form.value);
      else
        this.service.updateMember(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }
  
  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  displayRelationshipOnOff(obj) {
    this.displayRelationship = obj;
    if (this.displayRelationship){
      this.checkedDependent = false;
    }
  }

}