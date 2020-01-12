import { CanLoad, Router, Route, UrlSegment, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../components/authentication/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MedhanieAlemGuard implements CanActivate {


    constructor(private authService: AuthenticationService,
                private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (!this.authService.isAuthenticated()) {
            this.authService.logout();
            return false;
        }
        return true;
    }
}
