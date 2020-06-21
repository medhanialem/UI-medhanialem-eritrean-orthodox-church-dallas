import { IAuthorizationGuard } from './iAuthorization-Guard';
import { Roles } from './roles';
import { AuthenticationService } from './authentication.service';

export class ProfileAuthorizationGuard implements IAuthorizationGuard {


    constructor(public authService: AuthenticationService) {
    }
    userHasPermission(): boolean {
        let showProfile = false;
        let roles = this.authService.decodedToken().aud.replace('[','');
        roles = roles.replace(']','');
        roles = roles.replace(' ','');
        const role = roles.split(',');
        role.forEach(element => {
            if (
                element === Roles.abo_wenber_sebeka_gubae.toString() ||
                element === Roles.secretary.toString() ||
                element === Roles.admin.toString()
            ) {
                showProfile = true;
                return;
            }
        });
        return showProfile;
    }

}
