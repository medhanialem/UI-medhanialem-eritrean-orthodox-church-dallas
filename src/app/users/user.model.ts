import { Role } from '../shared/role';

export class UserModel {
    // userId: number;
    // firstName: string;
    // middleName: string;
    // lastName: string;
    // email: string;
    // roles: string[];
    // phoneNo: string;
    // createdDate: Date;
    // updatedDate: Date;
    // isActive: boolean;

    id: number;
    username: string;
    password: string;
    // role: Role[];
    role: string[];
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    active: boolean;
}
