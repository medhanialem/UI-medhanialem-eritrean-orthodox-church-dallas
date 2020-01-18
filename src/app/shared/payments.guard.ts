import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { MedhanieAlemGuard } from './guard';
import { Injectable } from '@angular/core';
import { PaymentsAuthorizationGuard } from './payments-authorization-guard';

@Injectable()
export class PaymentsGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean{
        if (!this.authService.isAuthenticated()) {
            this.authService.logout();
            return false;
        } else if (!this.authService.userHasPermission(new PaymentsAuthorizationGuard(this.authService))) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }

}