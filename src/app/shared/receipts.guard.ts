import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, UrlSegment } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { ReceiptsAuthorizationGuard } from './receipts-authorization-guard';

@Injectable()
export class ReceiptsGuard implements CanLoad {

    constructor(
        private authService: AuthenticationService,
        private router: Router) {
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.authService.isAuthenticated()) {
            this.authService.logout();
            return false;
        } else if (!this.authService.userHasPermission(new ReceiptsAuthorizationGuard(this.authService))) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}