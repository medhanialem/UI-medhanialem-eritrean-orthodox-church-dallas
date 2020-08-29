import { Role } from 'src/app/shared/role';

export class UserModelResponse {
    id: number;
    username: string;
    roles: Role[];
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    active: boolean;
}