import { CanLoad, Router, Route, UrlSegment, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

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


