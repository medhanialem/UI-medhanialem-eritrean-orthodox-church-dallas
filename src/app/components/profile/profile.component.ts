import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 


  constructor(
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private route: Router) { }
   
  ngOnInit() {
  }

  onChangePassword() {
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '%';

    const dialogRef = this.dialog.open(ChangepasswordComponent, dialogConfig);
 
  }



}
