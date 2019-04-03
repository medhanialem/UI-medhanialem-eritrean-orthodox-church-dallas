import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SundaySchoolComponent } from './components/pages/sunday-school/sunday-school.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sundayschool', component: SundaySchoolComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
