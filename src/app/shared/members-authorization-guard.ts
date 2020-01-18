import { IAuthorizationGuard } from './iAuthorization-Guard';
import { Roles } from './roles';
import { AuthenticationService } from './authentication.service';

export class MembersAuthorizationGuard implements IAuthorizationGuard {


    constructor(public authService: AuthenticationService) {
    }
    userHasPermission(): boolean {
        let showAddMember = false;
        const role = this.authService.decodedToken().role.split(',');
        role.forEach(element => {
            if (
                element === Roles.abo_wenber_sebeka_gubae.toString() ||
                element === Roles.secretary.toString() ||
                element === Roles.admin.toString()) {
                showAddMember = true;
                return;
            }
        });
        return showAddMember;
    }

}
