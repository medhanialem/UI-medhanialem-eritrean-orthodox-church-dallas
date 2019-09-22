import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SundaySchoolComponent } from './components/pages/sunday-school/sunday-school.component';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MembersComponent } from './components/members/members.component';
import { MemberComponent } from './components/members/member/member.component';
import { MemberService } from './components/members/shared/member.service';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MatConfirmDialogComponent } from './components/members/mat-confirm-dialog/mat-confirm-dialog.component';
import { SmsComponent } from './components/sms/sms.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { PaymentDialogComponent } from './components/payment/payment-dialog/payment-dialog.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    SundaySchoolComponent,
    HomeComponent,
    MembersComponent,
    MemberComponent,
    MemberListComponent,
    MatConfirmDialogComponent,
    SmsComponent,
    PaymentComponent,
    PaymentListComponent,
    PaymentDialogComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MemberService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [MemberComponent, MatConfirmDialogComponent,PaymentDialogComponent]
})
export class AppModule { }
