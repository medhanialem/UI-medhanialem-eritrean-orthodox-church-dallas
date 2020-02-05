import { NgModule } from '@angular/core';
import { UsersRouting } from './users.routing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
declarations: [UsersRouting.components, UserEditComponent],
imports: [UsersRouting, CommonModule, SharedModule, ReactiveFormsModule, FormsModule],
entryComponents: [UserRegistrationComponent, UserEditComponent]
})

export class UsersModule {

}
