import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [SharedModule, AuthenticationRoutingModule, ReactiveFormsModule],
    exports: [SharedModule],
    declarations: [AuthenticationComponent]
})
export class AuthenticationModule {

}
