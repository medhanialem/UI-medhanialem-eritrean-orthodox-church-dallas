import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { Roles } from '../authentication/roles';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';

const usersList: UserModel[] = [
    {
        userId: 1, firstName: 'test', middleName: 'test', lastName: 'user1', email: 'test.user1@test.com',
        roles: [Roles.admin], phoneNo: '1234567890',
        createdDate: new Date('2020-01-01'), updatedDate: new Date('2020-01-01'), isActive: true
    },
    {
        userId: 2, firstName: 'test', middleName: 'test', lastName: 'user2', email: 'test.user2@test.com',
        roles: [Roles.sebeka_gubae, Roles.secretary], phoneNo: '1234567890',
        createdDate: new Date('2020-01-01'), updatedDate: new Date('2020-01-01'), isActive: true

    },
    {
        userId: 3, firstName: 'test', middleName: 'test', lastName: 'user3', email: 'test.user3@test.com',
        roles: [Roles.secretary], phoneNo: '1234567890',
        createdDate: new Date('2020-01-01'), updatedDate: new Date('2020-01-01'), isActive: true

    },
    {
        userId: 4, firstName: 'test', middleName: 'test', lastName: 'user4', email: 'test.user4@test.com',
        roles: [Roles.super_sebeka_gubae], phoneNo: '1234567890',
        createdDate: new Date('2020-01-01'), updatedDate: new Date('2020-01-01'), isActive: true

    },
    {
        userId: 5, firstName: 'test', middleName: 'test', lastName: 'user5', email: 'test.user5@test.com',
        roles: [Roles.sundaySchool], phoneNo: '1234567890',
        createdDate: new Date('2020-01-01'), updatedDate: new Date('2020-01-01'), isActive: false

    }
];
@Injectable({ providedIn: 'root' })
export class UserService {

  private usersList$ = of(usersList);
  private baseUrl = environment.apiUrl;

  getUsers(showAll: boolean): Observable<UserModel []> {
      let userModelList: UserModel[] = [];
      this.usersList$.subscribe(
           (resp) => {
            if (resp != null) {
                if (showAll) {
                    userModelList = resp as UserModel[];
                } else {
                    resp.forEach(element => {
                        if (element.isActive) {
                            userModelList.push(element);
                        }
                 });
                }
            }
           }
       );
      return of(userModelList);
      // this.httpClient.get<UserModel []>(this.url)
  }
}
