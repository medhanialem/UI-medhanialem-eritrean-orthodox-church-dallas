import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ProfileAuthorizationGuard } from './profile-authorization-guard';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileGuard implements CanLoad {

    constructor(
        private authService: AuthenticationService,
        private router: Router) {
    }


    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.authService.isAuthenticated()) {
            this.authService.logout();
            return false;
        } else if (!this.authService.userHasPermission(new ProfileAuthorizationGuard(this.authService))) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}