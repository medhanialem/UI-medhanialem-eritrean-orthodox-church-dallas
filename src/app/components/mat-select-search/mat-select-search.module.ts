import { NgModule, ChangeDetectorRef } from '@angular/core';
// import { MatSelectSearchComponent } from './mat-select-search.component';
import { MatButtonModule, MatInputModule, MatIconModule, MatSelect } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [
    // MatSelectSearchComponent
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    // MatSelectSearchComponent
  ],
  providers: [
    MatSelect
  ]
})
export class MatSelectSearchModule { }