import { IAuthorizationGuard } from './iAuthorization-Guard';
import { Roles } from './roles';
import { AuthenticationService } from './authentication.service';

export class UsersAuthorizationGuard implements IAuthorizationGuard {

    constructor(public authService: AuthenticationService) {
    }
    userHasPermission(): boolean {
        let showUser = false;
        let roles = this.authService.decodedToken().aud.replace('[','');
        roles = roles.replace(']','');
        roles = roles.replace(' ','');
        const role = roles.split(',');
        role.forEach(element => {
            if (
                element === Roles.abo_wenber_sebeka_gubae.toString() ||
                element === Roles.admin.toString()) {
                showUser = true;
                return;
            }
        });
        return showUser;
    }

}
