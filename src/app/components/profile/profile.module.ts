import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProfileRouting } from './profile.routing';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
declarations: [
    ProfileRouting.components

],
imports: [
    ProfileRouting,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
],
entryComponents: [
    ChangepasswordComponent

]
})

export class ProfileModule {

}
