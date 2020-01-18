import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
    {path: '', component: UsersComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsersRouting {
    static components = [UsersComponent, UserRegistrationComponent];
}
