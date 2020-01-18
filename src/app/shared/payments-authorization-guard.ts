import { IAuthorizationGuard } from './iAuthorization-Guard';
import { Roles } from './roles';
import { AuthenticationService } from './authentication.service';

export class PaymentsAuthorizationGuard implements IAuthorizationGuard {


    constructor(public authService: AuthenticationService) {
    }
    userHasPermission(): boolean {
        let showPayments = false;
        const role = this.authService.decodedToken().role.split(',');
        role.forEach(element => {
            if (
                element === Roles.abo_wenber_sebeka_gubae.toString() ||
                element === Roles.secretary.toString() ||
                element === Roles.admin.toString()
            ) {
                showPayments = true;
                return;
            }
        });
        return showPayments;
    }

}
