import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent1 } from './components/layout/header/header.component1';
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
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { PaymentDialogComponent } from './components/payment/payment-dialog/payment-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { DatePipe } from '@angular/common';
import { PaymentConfirmationComponent } from './components/payment/payment-confirmation/payment-confirmation.component';
import { MemberPaymentReceiptComponent } from './components/payment/member-payment-receipt/member-payment-receipt.component';
import { MemberPaymentPreviewComponent } from './components/payment/member-payment-preview/member-payment-preview.component';
import { DialogCloseComponent } from './components/members/add-member-dialog-close/dialog-close.component';
import { MedhanieAlemGuard } from './shared/guard';
import { AlertifyService } from './shared/alertify.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { HeaderComponent } from './navigation/header/header.component';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { UsersComponent } from './users/users.component';
import { PaymentsGuard } from './shared/payments.guard';
import { UsersGuard } from './shared/users.guard';
import { UserAuthorizationComponent } from './users/user-authorization/user-authorization.component';
import { MoveMemberComponent } from './components/members/move-member/move-member.component';
import { MatSelectSearchComponent } from './components/mat-select-search/mat-select-search.component';
import { StrictNumberDirective } from './shared/strict-number-only-directive';
import { ProfileGuard } from './shared/profile.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent1,
    AboutComponent,
    SundaySchoolComponent,
    HomeComponent,
    MembersComponent,
    MemberComponent,
    MemberListComponent,
    MatConfirmDialogComponent,
    PaymentComponent,
    PaymentListComponent,
    PaymentDialogComponent,
    MessageComponent,
    PaymentConfirmationComponent,
    MemberPaymentReceiptComponent,
    MemberPaymentPreviewComponent,
    DialogCloseComponent,
    NavigationComponent,
    SidebarComponent,
    HeaderComponent,
    UserAuthorizationComponent,
    MoveMemberComponent,
    MatSelectSearchComponent,
    StrictNumberDirective
  ],

  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    TextMaskModule
  ],

  providers: [
    MemberService,
    DatePipe,
    MedhanieAlemGuard,
    AlertifyService,
    PaymentsGuard,
    UsersGuard,
    ProfileGuard
  ],

  bootstrap: [AppComponent],
  entryComponents: [
    MemberComponent,
    MatConfirmDialogComponent,
    PaymentDialogComponent,
    MessageComponent,
    PaymentConfirmationComponent,
    MemberPaymentReceiptComponent,
    MemberPaymentPreviewComponent,
    DialogCloseComponent,
    UserAuthorizationComponent,
    MoveMemberComponent
  ]

})

export class AppModule { }