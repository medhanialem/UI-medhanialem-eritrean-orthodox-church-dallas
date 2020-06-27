import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms' ;
import { Member, Tier } from '../member';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  // private memberList$ = of(memberList);
  // private tierList$ = of(tiers);
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

  public getAllMemberList(): Observable<Member[]> {
    // return this.memberList$;
    const headers = this.getHttpHeaders();
    return this.httpClient.get<Member[]>(`${this.baseUrl}members?preset=all`, {headers});
  }

  public getHttpHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')});
  }

  // public getAllUserNames(): Observable<Member[]> {
  //   return this.memberList$;
  //   // this.httpClient.get<Member[]>(this.url)
  // }
}
