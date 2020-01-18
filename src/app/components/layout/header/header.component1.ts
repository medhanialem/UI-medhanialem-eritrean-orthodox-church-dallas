import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
@Component({
  selector: 'app-header1',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent1 implements OnInit {

  userDisplayName = '';
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  logOut() {
   this.authService.logout();
  }

  showHideLoggedInUser(): boolean {
    return this.authService.isAuthenticated();
  }
}
