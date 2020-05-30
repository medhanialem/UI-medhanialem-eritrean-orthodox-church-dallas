import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LookupsRouting } from './lookups.routing';
import { LookupComponent } from './lookup/lookup.component';
import { StrictNumberDecimalOnlyDirective } from '../shared/strict-number-decimal-only-directive';

@NgModule({
declarations: [
    LookupsRouting.components,
    LookupComponent,
    StrictNumberDecimalOnlyDirective
],
imports: [
    LookupsRouting,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
],
entryComponents: [
    LookupComponent
]
})

export class LookupsModule {

}
