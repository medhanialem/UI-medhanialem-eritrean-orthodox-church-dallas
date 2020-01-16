import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Roles } from '../../authentication/roles';
import { Member } from '../../members/member';
import { MemberService } from '../../members/shared/member.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  members: Member[] = [];
  roles: any = Roles;
  email = '';
  phoneNo = '';
  registrationForm: FormGroup;
  constructor(private memberService: MemberService, private fb: FormBuilder) {
    this.registrationForm = fb.group({
      user: [null, Validators.required],
      email: [null],
      phoneNo: [null],
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(5)]],
      roles: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getAllUserNames();
  }

  getAllUserNames() {
    this.memberService.getAllUserNames().subscribe(
    (response) => {
      this.members = response as Member[];
    },
    (error) => {
      console.log(error);
    },
    () => {
      // To-Do
    }
    );
  }

  onMemberSelected(event: any) {
    this.email = event.value.email;
    this.phoneNo = event.value.homePhoneNo;
  }

  onSave() {

  }

  onClear() {
    this.registrationForm.reset();
  }

}
