import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LookupsComponent } from './lookups.component';

const routes: Routes = [
    {path: '', component: LookupsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LookupsRouting {
    static components = [LookupsComponent];
}
