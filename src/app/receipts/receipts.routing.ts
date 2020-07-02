import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReceiptsComponent } from './receipts.component';

const routes: Routes = [
    {path: '', component: ReceiptsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceiptsRouting {
    static components = [ReceiptsComponent];
}
