import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReceiptsRouting } from './receipts.routing';

@NgModule({
declarations: [
    ReceiptsRouting.components
],
imports: [
    ReceiptsRouting,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
],
entryComponents: [
]
})

export class ReceiptsModule {

}
