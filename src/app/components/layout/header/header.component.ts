import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
