import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


const routes: Routes = [
    {path: '', component: ProfileComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProfileRouting {
    static components = [ProfileComponent, ChangepasswordComponent];
}
