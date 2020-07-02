import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SundaySchoolComponent } from './components/pages/sunday-school/sunday-school.component';
import { MedhanieAlemGuard } from './shared/guard';
import { NavigationComponent } from './navigation/navigation.component';
import { MembersComponent } from './components/members/members.component';
import { PaymentListComponent } from './components/payment/payment-list/payment-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UsersComponent } from './users/users.component';
import { PaymentsGuard } from './shared/payments.guard';
import { UsersGuard } from './shared/users.guard';
import { ProfileGuard } from './shared/profile.guard';
import { ReceiptsGuard } from './shared/receipts.guard';


const routes: Routes = [

  {
    path: 'login', loadChildren:
     () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '', component: NavigationComponent, canActivate: [MedhanieAlemGuard],
    children: [
      { path: '', redirectTo: '/members', pathMatch: 'full'},
      {path: 'members', component: MembersComponent, canActivate: [MedhanieAlemGuard]},
      {
        path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canLoad: [UsersGuard]
      },
      {
        path: 'tiers', loadChildren: () => import('./tiers/tiers.module').then(m => m.TiersModule), canLoad: [UsersGuard]
      },
      {
        path: 'paymentLookUp', loadChildren: () => import('./lookups/lookups.module').then(m => m.LookupsModule), canLoad: [UsersGuard]
      },
      {
        path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule), canLoad: [ProfileGuard]
      },
      {
        path: 'payments', component: PaymentComponent, canActivate: [PaymentsGuard]
      },
      {
        path: 'receipts', loadChildren: () => import('./receipts/receipts.module').then(m => m.ReceiptsModule), canLoad: [ReceiptsGuard]
      },
      {
        path: '**', redirectTo: '/members'
      }
  ]}
];

// [
//   {path: 'login',
//    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
//   },
//   {path: '', component: HomeComponent, canActivate: [MedhanieAlemGuard]},
//   {path: 'sundayschool', component: SundaySchoolComponent, canActivate: [MedhanieAlemGuard]},
//   {path: 'about', component: AboutComponent, canActivate: [MedhanieAlemGuard]}
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
