import { IAuthorizationGuard } from './iAuthorization-Guard';
import { Roles } from './roles';
import { AuthenticationService } from './authentication.service';

export class ReceiptsAuthorizationGuard implements IAuthorizationGuard {


    constructor(public authService: AuthenticationService) {
    }
    userHasPermission(): boolean {
        let showReceipts = false;
        let roles = this.authService.decodedToken().aud.replace('[', '');
        roles = roles.replace(']', '');
        roles = roles.replace(' ', '');
        const role = roles.split(',');
        role.forEach(element => {
            if (
                element === Roles.abo_wenber_sebeka_gubae.toString() ||
                element === Roles.secretary.toString() ||
                element === Roles.admin.toString()
            ) {
                showReceipts = true;
                return;
            }
        });
        return showReceipts;
    }

}
