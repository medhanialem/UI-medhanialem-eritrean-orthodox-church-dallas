import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms' ;
import { Member } from '../member';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const memberList: Member[] = [
  {
    memberId: 1,    churchId: 'MOECD-1', legacyId:'001',   firstName: 'Daniel',    middleName: 'Tefera',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave', 
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'), 
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,   
    tier: 1,    status: true, sebekaGubae: true, sundaySchool: true
  },
  {
    memberId: 2,    churchId: 'MOECD-2', legacyId:'002',   firstName: 'LeteMariam',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  },
  {
    memberId: 3,    churchId: 'MOECD-3', legacyId:'003',   firstName: 'Samsom',    middleName: 'S',    lastName: 'Negash',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  },
  {
    memberId: 4,    churchId: 'MOECD-4', legacyId:'004',   firstName: 'Yodit',    middleName: 'Kiflu',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave', 
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'), 
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,   
    tier: 1,    status: true, sebekaGubae: false, sundaySchool: false
  },
  {
    memberId: 5,    churchId: 'MOECD-5', legacyId:'005',   firstName: 'Robel',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  },
  {
    memberId: 6,    churchId: 'MOECD-6',  legacyId:'006',  firstName: 'Temesghen',    middleName: 'S',    lastName: 'Habte',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  },
  {
    memberId: 1,    churchId: 'MOECD-1', legacyId:'001',   firstName: 'Daniel',    middleName: 'Tefera',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave', 
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'), 
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,   
    tier: 1,    status: true, sebekaGubae: true, sundaySchool: true
  },
  {
    memberId: 2,    churchId: 'MOECD-2', legacyId:'002',   firstName: 'LeteMariam',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  },
  {
    memberId: 3,    churchId: 'MOECD-3', legacyId:'003',   firstName: 'Samsom',    middleName: 'S',    lastName: 'Negash',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  },
  {
    memberId: 4,    churchId: 'MOECD-4', legacyId:'004',   firstName: 'Yodit',    middleName: 'Kiflu',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave', 
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'), 
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,   
    tier: 1,    status: true, sebekaGubae: false, sundaySchool: false
  },
  {
    memberId: 5,    churchId: 'MOECD-5', legacyId:'005',   firstName: 'Robel',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  },
  {
    memberId: 6,    churchId: 'MOECD-6',  legacyId:'006',  firstName: 'Temesghen',    middleName: 'S',    lastName: 'Habte',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038',    registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: 1,    status: true, sebekaGubae:false, sundaySchool:true
  }
];
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private $memberList = of(memberList);

  constructor(private httpClient: HttpClient) { }

  public getMemberList(): Observable<Member[]> {
    return this.$memberList;
  }
}
