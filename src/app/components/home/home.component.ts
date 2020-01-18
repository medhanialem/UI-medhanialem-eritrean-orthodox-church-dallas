import { Component, OnInit } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Roles } from 'src/app/shared/roles';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  hasAdminRole() {
    return this.authService.decodedToken().role === Roles.admin ||
     this.authService.decodedToken().role === Roles.sebeka_gubae;
  }
}
