import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SundaySchoolComponent } from './components/pages/sunday-school/sunday-school.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { MedhanieAlemGuard } from './shared/guard';

const routes: Routes = [
  {path: 'login',
   loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {path: '', component: HomeComponent, canActivate: [MedhanieAlemGuard]},
  {path: 'sundayschool', component: SundaySchoolComponent, canActivate: [MedhanieAlemGuard]},
  {path: 'about', component: AboutComponent, canActivate: [MedhanieAlemGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
