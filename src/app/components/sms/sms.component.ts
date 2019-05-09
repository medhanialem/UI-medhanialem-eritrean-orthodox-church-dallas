import { Component, OnInit } from '@angular/core';
import { MemberService } from '../members/shared/member.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms' ;
import { NotificationService } from '../members/shared/notification.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {

  constructor(private service: MemberService, private notificationService: NotificationService) { }

  memberList: Array<any>;
  sundaySchoolNumbers: Array<any> = [];
  sebekaGubaeNumbers: Array<any> = [];
  allMembersNumbers: Array<any> = [];
  specificMembers: Array<any> = [];
  specificMembersSelected: Array<any> = [];
  filterMemberIds: Array<any>;
  memberTypeSelected: any;

  sortedMemberList: Array<any> = [];

  displaySingleMembersInfo: boolean = false;

  ngOnInit() {
    // Heavy lift of members full information while the page loads
    this.memberList = this.service.getMembers();

    // Filter numbers based on membership type 
    this.putNumbersToMemberTypeArrays(this.memberList);

    // Sort values to be used in the dropdown for specific members in sms (NOT WORKIGN)
    this.sortMembers();
    console.log("::::::: ", this.sortedMemberList);
  }

  // Possible member types
  member = [
    {id: 1, value: 'Sunday school'},
    {id: 2, value: 'Sebeka gubae'},
    {id: 3, value: 'All members'},
    {id: 4, value: 'Specific member/s'}
  ];

  smsForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    memberType: new FormControl('1'),
    specificMember: new FormControl(this.filterMemberIds)
  });

  // Filter membership type and collect their numbers which will serve in sending messages
  putNumbersToMemberTypeArrays(members): void {
    for (let i=0; i < members.length; i++){
      console.log("isSundaySchoolMember ", members[i].isSundaySchoolMember);
      //Sunday school
      if (members[i].isSundaySchoolMember) {
        this.sundaySchoolNumbers.push(members[i].mobile);
      }
      //Sebeka gubae
      if (members[i].isSebekaGubae) {
        this.sebekaGubaeNumbers.push(members[i].mobile);
      }
      //All members
      this.allMembersNumbers.push(members[i].mobile);
    }
  }

  onSubmit(){
    if (this.smsForm.valid){

      if (this.memberTypeSelected == 1) {
        //call backend service with sundaySchoolNumbers
        console.log("sundaySchoolNumbers ", this.sundaySchoolNumbers);
      }
      else if (this.memberTypeSelected == 2) {
        //call backend service with sebekaGubaeNumbers
        console.log("sebekaGubaeNumbers ", this.sebekaGubaeNumbers);
      }
      else if (this.memberTypeSelected == 3) {
        //call backend service with allMembersNumbers
        console.log("allMembersNumbers ", this.allMembersNumbers);
      }
      else if (this.memberTypeSelected == 4) {
        //call backend service with specific phone number/s selected
      }

      this.smsForm.reset();
      this.initializeFormGroup();
      this.notificationService.success(':: Sent successfully');
    }
  }

  onClear(){
    this.smsForm.reset();
    this.memberTypeSelected = 1;
    this.initializeFormGroup();
    console.log("phones ", this.specificMembersSelected);
  }

  initializeFormGroup (){
    this.smsForm.setValue({
      message: '',
      memberType: new FormControl('1'),
      specificMember: new FormControl(this.memberList)
    })
  }

  // Sort members in ascending order - will serve specific members dropdown (NOT WORKING)
  sortMembers(): void {
    this.sortedMemberList = this.memberList.sort((m1, m2) => {
      if (m2.firstName - m1.firstName > 1) {
          return 1;
      }
  
      if (m2.firstName - m1.firstName < 1) {
          return -1;
      }
      return 0;

      // return m1.firstName - m2.firstName;
  });
  }
}
