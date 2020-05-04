import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-add-member-dialog-close',
  templateUrl: './dialog-close.component.html',
  styleUrls: ['./dialog-close.component.css']
})
export class DialogCloseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogCloseComponent>) { }

  ngOnInit() {
  }

  closeAddMemberDialog(response: string) {
    this.dialogRef.close(response);
  }
}
