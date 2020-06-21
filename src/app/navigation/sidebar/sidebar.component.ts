import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Router } from '@angular/router';
import { Roles } from 'src/app/shared/roles';
import { PaymentsAuthorizationGuard } from 'src/app/shared/payments-authorization-guard';
import { UsersAuthorizationGuard } from 'src/app/shared/users-authorization-guard';
import { TiersAuthorizationGuard } from 'src/app/shared/tiers-authorization-guard';
import { PaymentLookUpsAuthorizationGuard } from 'src/app/shared/payment-look-ups-authorization-guard';
import { ProfileAuthorizationGuard } from 'src/app/shared/profile-authorization-guard';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() expanded = false;
  element: HTMLElement;
  constructor(
    public authenticationService: AuthenticationService,
    private route: Router) { }

  ngOnInit() {
  }

  onToggle(event: any) {
    event.preventDefault();
  }

  logout() {
   this.authenticationService.logout();
  }

  showPayments(): boolean {
   return this.authenticationService.userHasPermission(new PaymentsAuthorizationGuard(this.authenticationService));
  }

  showUsers(): boolean {
    return this.authenticationService.userHasPermission(new UsersAuthorizationGuard(this.authenticationService));
  }

  showTiers(): boolean {
    return this.authenticationService.userHasPermission(new TiersAuthorizationGuard(this.authenticationService));
  }

  showPaymentLookUp(): boolean {
    return this.authenticationService.userHasPermission(new PaymentLookUpsAuthorizationGuard(this.authenticationService));
  }

  showProfile(): boolean {
    return this.authenticationService.userHasPermission(new ProfileAuthorizationGuard(this.authenticationService));
  }
}
