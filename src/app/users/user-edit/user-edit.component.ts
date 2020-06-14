import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Roles } from 'src/app/shared/roles';
import { Member } from 'src/app/components/members/member';
import { MemberService } from 'src/app/components/members/shared/member.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCloseComponent } from 'src/app/components/members/add-member-dialog-close/dialog-close.component';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';
import { UserModelResponse } from '../user-registration/user-model-response';
import { Role } from 'src/app/shared/role';
import { RoleService } from 'src/app/shared/role-service';
import { Subscription } from 'rxjs';
import { UserModelForUpdate } from '../user-model-for-update';
import { AlertifyService } from 'src/app/shared/alertify.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private subscriptions: Subscription [] = [];
  editUserForm: FormGroup;
  userToBeUpdated: UserModelForUpdate = new UserModelForUpdate();
  activeInactive = ['Active', 'Inactive'];
  selectedUserStatus = '';

  rolesFromDB: Role [] = [];
  selectedRoles: Role[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: UserModelResponse,
    private memberService: MemberService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserEditComponent>,
    private userService: UserService,
    private roleService: RoleService,
    private alertify: AlertifyService) {
      this.data.active ? this.selectedUserStatus = 'Active' : this.selectedUserStatus = 'Inactive';
      this.selectedRoles = this.data.roles;
      this.editUserForm = fb.group({
      email: new FormControl({value: data.username, disabled: true}),
      roles: [this.selectedRoles, Validators.required],
      status: [this.selectedUserStatus]
    });

  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.rolesFromDB = [];
    this.subscriptions.push(
        this.roleService.getAllRoles().subscribe(
          response => {
            if (response != null) {
              response.forEach(r => {
                if (r.name !== 'ADMIN') {
                  this.rolesFromDB.push(r);
                }
                this.data.roles.forEach(roles => {
                  if (r.name === roles.name) {
                    this.selectedRoles.push(r);
                  }
                });
              });
            }
          },
          (error) => {console.log(error); },
          () => { }
        )
    );
  }

  onSave() {
    if (this.editUserForm.valid) {
      this.populateUser();
      this.userService.updateUser(this.userToBeUpdated).subscribe(
        (result) => {
          console.log(result);
          this.alertify.success('Successfully updated ' + this.userToBeUpdated.username);
          this.dialogRef.close(null);
        },
        (error) => {
          console.log(error);
          this.alertify.error('Unable to update ' + this.userToBeUpdated.username);
          this.dialogRef.close(null);
        },
        () => {}
      );

    }
  }

  populateUser() {
    this.userToBeUpdated.id = this.data.id;
    this.userToBeUpdated.username = this.data.username;
    this.selectedUserStatus === 'Active' ? this.userToBeUpdated.active = true : this.userToBeUpdated.active = false;
    const rolesStringArray: string[] = [];
    this.selectedRoles.forEach(r => { rolesStringArray.push(r.name.replace(/_/g, ' ').toLowerCase()); });
    this.userToBeUpdated.roles = rolesStringArray as string[];
  }

  onRolesSelected(event) {
    this.selectedRoles = event.value;
  }

  onClose() {
    if (this.editUserForm.dirty) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '30%';
      const dialogRef = this.dialog.open(DialogCloseComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes') {
          this.dialogRef.close(null);
        }
      });
    } else {
      this.dialogRef.close(null);
    }
  }

  saveUserDisabled() {
    return !this.editUserForm.valid || !this.editUserForm.dirty;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
