import { Role } from '../shared/role';

export class UserModelForUpdate {
    id: number;
    username: string;
    roles: string[];
    active: boolean;
}