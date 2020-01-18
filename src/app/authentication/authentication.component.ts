import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/alertify.service';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private alertify: AlertifyService) {

    this.loginForm = fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
   }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.valid) {
      if (this.authService.signIn(this.loginForm.value.userName, this.loginForm.value.password)) {
        this.router.navigate(['/']);
      } else {
        this.alertify.error('Invalid username or password');
      }
    } else {
      console.log('invalid form');
    }
  }

  onClear() {
    this.loginForm.reset();
  }

}
