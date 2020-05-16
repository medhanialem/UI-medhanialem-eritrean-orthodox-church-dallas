import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TiersComponent } from './tiers.component';

const routes: Routes = [
    {path: '', component: TiersComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TiersRouting {
    static components = [TiersComponent];
}
