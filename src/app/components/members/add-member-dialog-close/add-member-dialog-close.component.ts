import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-add-member-dialog-close',
  templateUrl: './add-member-dialog-close.component.html',
  styleUrls: ['./add-member-dialog-close.component.css']
})
export class AddMemberDialogCloseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddMemberDialogCloseComponent>) { }

  ngOnInit() {
  }

  closeAddMemberDialog (response: string){
    this.dialogRef.close(response);
  }
  
}
