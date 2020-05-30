import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms' ;
import { Member, Tier } from '../member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const tiers: Tier[] = [
  {id: 1, tierType: 'tier1', description: 'Student'},
  {id: 2, tierType: 'tier2', description: 'Single'},
  {id: 3, tierType: 'tier3', description: 'Married'},
  {id: 4, tierType: 'tier4', description: 'Voluntary'}
];

const memberList: Member[] = [
  {
    memberId: 1,    churchId: 'MCD-1', oldChurchId: 1, legacyId: '001', maritalStatus: "Single", firstName: 'Daniel',    middleName: 'Tefera',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave',
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,
    tier: {id: 1, tierType: 'tier1',description: 'Student'},    status: 'ACTIVE', sebekaGubae: true, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 2,    churchId: 'MCD-2', oldChurchId: 2, legacyId: '002', maritalStatus: "Single", firstName: 'LeteMariam',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 1, tierType: 'tier1',description: 'Student'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 3,    churchId: 'MCD-3', oldChurchId: 3, legacyId: '003', maritalStatus: "Single", firstName: 'Samsom',    middleName: 'S',    lastName: 'Negash',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 2, tierType: 'tier1',description: 'Single'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 4,    churchId: 'MCD-4', oldChurchId: 4, legacyId: '004',   maritalStatus: "Single",firstName: 'Yodit',    middleName: 'Kiflu',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave',
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,
    tier: {id: 2,  tierType: 'tier1',description: 'Single'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: false,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 5,    churchId: 'MCD-5', oldChurchId: 5, legacyId: '005',   maritalStatus: "Single",firstName: 'Robel',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 1,  tierType: 'tier1',description: 'Student'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 6,    churchId: 'MCD-6',  oldChurchId: 6, legacyId: '006',  maritalStatus: "Single",firstName: 'Temesghen',    middleName: 'S',    lastName: 'Habte',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 3, tierType: 'tier1',description: 'Married'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 1,    churchId: 'MCD-1', oldChurchId: 7, legacyId: '001',   maritalStatus: "Single",firstName: 'Daniel',    middleName: 'Tefera',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave',
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,
    tier: {id: 3, tierType: 'tier1',description: 'Married'},    status: 'ACTIVE', sebekaGubae: true, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 2,    churchId: 'MCD-2', oldChurchId: 8, legacyId: '002',   maritalStatus: "Single",firstName: 'LeteMariam',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 1, tierType: 'tier1',description: 'Student'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 3,    churchId: 'MCD-3', oldChurchId: 9, legacyId: '003',   maritalStatus: "Single",firstName: 'Samsom',    middleName: 'S',    lastName: 'Negash',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 2,  tierType: 'tier1',description: 'Single'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 4,    churchId: 'MCD-4', oldChurchId: 10, legacyId: '004',   maritalStatus: "Single",firstName: 'Yodit',    middleName: 'Kiflu',    lastName: 'Kifle',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '', email: 'Daniel.Kifle@gmail.com',   streetAddress: '8901 Veller Ave',
    apartmentNo: '123',    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),
    superId: null, relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),  updatedBy: 1,
    tier: {id: 4,   tierType: 'tier1',description: 'Voluntary'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: false,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 5,    churchId: 'MCD-5', oldChurchId: 11, legacyId: '005',   maritalStatus: "Single",firstName: 'Robel',    middleName: 'TecleHaimanot',    lastName: 'TecleMariam',    gender: 'Female',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'LeteMariam.TecleMariam@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 4,  tierType: 'tier1',description: 'Voluntary'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  },
  {
    memberId: 6,    churchId: 'MCD-6',  oldChurchId: 12, legacyId: '006',  maritalStatus: "Single",firstName: 'Temesghen',    middleName: 'S',    lastName: 'Habte',    gender: 'Male',
    homePhoneNo: '6419198902',    workPhoneNo: '',    email: 'Daniel.Kifle@gmail.com',    streetAddress: '8901 Veller Ave',    apartmentNo: '123',
    city: 'Irving',  state: 'Texas',    zipCode: '75038', paymentStartDate: new Date('4/13/2019'), registrationDate: new Date('4/13/2019'),    superId: null,
    relationShip: 'Self',    createdDate: new Date(), createdBy: 1,    updatedDate: new Date(),
    updatedBy: 1,    tier: {id: 2, tierType: 'tier1',description: 'Single'},    status: 'ACTIVE', sebekaGubae: false, sundaySchool: true,
    fatherPriest: 1, relationship: null
  }
];
@Injectable({
  providedIn: 'root'
})
export class MemberService {


  private memberList$ = of(memberList);
  private tierList$ = of(tiers);
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getMember(memberId: number): Observable<Member> {
    const headers = this.getHttpHeaders();
    return this.httpClient.get<Member>(`${this.baseUrl}members/` + memberId, {headers});
  }

  public getMemberList(): Observable<Member[]> {
    // return this.memberList$;
    const headers = this.getHttpHeaders();
    return this.httpClient.get<Member[]>(`${this.baseUrl}members?preset=primary`, {headers});
  }

  public getPriestFathersList(): Observable<Member[]> {
    // return this.memberList$;
    const headers = this.getHttpHeaders();
    return this.httpClient.get<Member[]>(`${this.baseUrl}members?preset=priests`, {headers});
  }

  public getDependentsList(memberId: number): Observable<Member[]> {
    // return this.memberList$;
    const headers = this.getHttpHeaders();
    return this.httpClient.get<Member[]>(`${this.baseUrl}members?preset=dependents&parentId=` + memberId, {headers});
  }

  // public getTierList(): Observable<Tier[]> {
  //   //return this.tierList$;
  //   const headers = this.getHttpHeaders();
  //   return this.httpClient.get<Tier[]>(`${this.baseUrl}tiers`, {headers});
  // }

  public saveMember(member: Member, action: string): Observable<Member> {
    // come back and replace this with the rest endpoint.
    //memberList.push(member);
    //return of(200);
    const headers = this.getHttpHeaders();
    if (null != action && action.toLowerCase() === 'save') {
      return this.httpClient.post<Member>(`${this.baseUrl}members`, member, {headers});
    } else if (null != action && action.toLowerCase() === 'update') {
      const memberId = member.memberId;
      return this.httpClient.put<Member>(`${this.baseUrl}members/` + memberId, member, {headers});
    }
  }

  public moveMember(memberId: number, action: string, memberToBeMovedToId: number) {
    const headers = this.getHttpHeaders();
    if (null != action && action.toLowerCase() === 'move') {
      return this.httpClient.delete(`${this.baseUrl}members?memberId=` + memberId
                                        + '&type=' + action + '&secMemberId=' + memberToBeMovedToId, {headers});
    } else if (null != action && action.toLowerCase() === 'deactivate') {
      return this.httpClient.delete(`${this.baseUrl}members?memberId=` + memberId + '&type=' + action, {headers});
    } else if (null != action && action.toLowerCase() === 'upgrade') {
      return this.httpClient.delete(`${this.baseUrl}members?memberId=` + memberId + '&type=' + action, {headers});
    } else if (null != action && action.toLowerCase() === 'reactivate') {
      return this.httpClient.delete(`${this.baseUrl}members?memberId=` + memberId + '&type=' + action, {headers});
    }
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

  public getAllUserNames(): Observable<Member[]> {
    return this.memberList$;
    // this.httpClient.get<Member[]>(this.url)
  }
}
