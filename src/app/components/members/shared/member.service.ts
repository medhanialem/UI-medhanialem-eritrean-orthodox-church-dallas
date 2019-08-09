import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms' ;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  memberList: Array<any>  = [{
    $key: 1,
    firstName: 'Daniel',
    lastName: 'Kifle',
    dependency: '1',
    relationship: '1',
    gender: '1', //will be changed to male or female while getting data from the backend
    mobile: '6419198902',
    address: '8901 Veller Ave Irving, TX 76211',
    email: 'andom.woldu@gmail.com',
    registrationDate: '4/13/2019',
    isSundaySchoolMember: true,
    isSebekaGubae: false
  },
  {
    $key: 2,
    firstName: 'Robel',
    lastName: 'Woldu',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'hagos.biniam@gmail.com',
    registrationDate: '4/01/2019',
    isSundaySchoolMember: true,
    isSebekaGubae: false
  },
  {
    $key: 3,
    firstName: 'Tesfahiwet',
    lastName: 'Array',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '7034195193',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'John.Raggio@gmail.com',
    registrationDate: '4/13/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 4,
    firstName: 'Burtye',
    lastName: 'Andemariam',
    dependency: '1',
    relationship: '1',
    gender: '2',
    mobile: '2139847705',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Selam.Biniam@gmail.com',
    registrationDate: '4/01/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 5,
    firstName: 'Katy',
    lastName: 'Anderson',
    dependency: '1',
    relationship: '1',
    gender: '2',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'andom.woldu@gmail.com',
    registrationDate: '4/13/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: true
  },
  {
    $key: 6,
    firstName: 'Peter',
    lastName: 'Joy',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Peter.Joy@gmail.com',
    registrationDate: '4/01/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 7,
    firstName: 'Kifle',
    lastName: 'Kidane',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Kifle.Kidane@gmail.com',
    registrationDate: '4/13/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 8,
    firstName: 'Temesgen',
    lastName: 'Teklay',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Temesgen.Teklay@gmail.com',
    registrationDate: '4/01/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 9,
    firstName: 'Samuel',
    lastName: 'Beraki',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Samuel.Beraki@gmail.com',
    registrationDate: '4/13/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 10,
    firstName: 'Yosias',
    lastName: 'Berhe',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Yosias.Berhe@gmail.com',
    registrationDate: '4/01/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 11,
    firstName: 'Freweyni',
    lastName: 'Teklehaimanot',
    dependency: '1',
    relationship: '1',
    gender: '2',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Freweyni.Teklehaimanot@gmail.com',
    registrationDate: '4/13/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  },
  {
    $key: 12,
    firstName: 'Andebirhan',
    lastName: 'Gebregergish',
    dependency: '1',
    relationship: '1',
    gender: '1',
    mobile: '2133529858',
    address: '8901 Veller Ave Dallas, TX 75233',
    email: 'Andebirhan.Gebregergish@gmail.com',
    registrationDate: '4/01/2019',
    isSundaySchoolMember: false,
    isSebekaGubae: false
  }
  ];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
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

  initializeFormGroup (){
    this.form.setValue({
      $key: null,
      firstName: '',
      lastName: '',
      dependency: '1',
      relationship: '1',
      gender: '1',
      mobile: '',
      address: '',
      email: '',
      registrationDate: '',
      isSundaySchoolMember:'',
      isSebekaGubae:''

    })
  }

  getMembers(){
    return this.memberList;
  }

  insertMember(member) {
    this.memberList.push({
      firstName: member.firstName,
      lastName: member.lastName,
      gender: member.gender,
      mobile: member.mobile,
      address: member.address,
      email: member.email,
      registrationDate: member.registrationDate
    });
  }

  updateMember(member) {
    // this.memberList.update(member.$key, 
    //   {
    //     firstName: member.firstName,
    //     lastName: member.lastName,
    //     gender: member.gender,
    //     mobile: member.mobile,
    //     email: member.email,
    //     address: member.address,
    //     registrationDate: member.registrationDate
    // });
    for (let i = 0; i < this.deleteMember.length; i++){
      if (this.memberList[i].$key == member.$key) {
        this.memberList[i].firstName = member.firstName;
        this.memberList[i].lastName = member.lastName;
        this.memberList[i].gender = member.gender;
        this.memberList[i].mobile = member.mobile;
        this.memberList[i].address = member.address;
        this.memberList[i].email = member.email;
        this.memberList[i].registrationDate = member.registrationDate;
      }
    }
  }

  deleteMember($key: string) {
    //call delete operation from service
      for (let i = 0; i < this.deleteMember.length; i++){
        if (this.memberList[i].$key == $key) {
          this.memberList.splice(i, 1);
        } 
      }
  }

  populateForm(member){
    this.form.setValue(member);
  }
}
