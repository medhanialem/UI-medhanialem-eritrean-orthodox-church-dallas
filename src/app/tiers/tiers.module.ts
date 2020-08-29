import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TiersRouting } from './tiers.routing';
import { TierComponent } from './tier/tier.component';

@NgModule({
declarations: [
    TiersRouting.components,
    TierComponent
],
imports: [
    TiersRouting,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
],
entryComponents: [
    TierComponent
]
})

export class TiersModule {

}
