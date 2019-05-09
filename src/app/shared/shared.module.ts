import { NgModule } from '@angular/core';
import * as Material from '@angular/material';

@NgModule ({
    imports: [
        Material.MatTabsModule,
        Material.MatButtonToggleModule,
        Material.MatToolbarModule,
        Material.MatGridListModule,
        Material.MatFormFieldModule,
        Material.MatInputModule,
        Material.MatRadioModule,
        Material.MatDatepickerModule,
        Material.MatNativeDateModule,
        Material.MatButtonModule,
        Material.MatSnackBarModule,
        Material.MatTableModule,
        Material.MatIconModule,
        Material.MatPaginatorModule,
        Material.MatSortModule,
        Material.MatDialogModule,
        Material.MatSelectModule,
        Material.MatCheckboxModule
    ],
    exports: [
        Material.MatTabsModule,
        Material.MatButtonToggleModule,
        Material.MatToolbarModule,
        Material.MatGridListModule,
        Material.MatFormFieldModule,
        Material.MatInputModule,
        Material.MatRadioModule,
        Material.MatDatepickerModule,
        Material.MatNativeDateModule,
        Material.MatButtonModule,
        Material.MatSnackBarModule,
        Material.MatTableModule,
        Material.MatIconModule,
        Material.MatPaginatorModule,
        Material.MatSortModule,
        Material.MatDialogModule,
        Material.MatSelectModule,
        Material.MatCheckboxModule
    ]
})

export class SharedModule {}