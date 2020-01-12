import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [SharedModule, AuthenticationRoutingModule, ReactiveFormsModule],
    exports: [SharedModule],
    declarations: [AuthenticationComponent]
})
export class AuthenticationModule {

}
