import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Word } from 'src/api/models/word.model';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {

   public showCloseButton: boolean = true;
   public dialogTitle: string;
   public dialogButtons: DialogButton[];

    constructor(private router: Router,
        public dialogRef: MatDialogRef<DialogTemplateComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any) {
            this.dialogTitle = data.dialogTitle;
            this.dialogButtons = data.dialogButtons;
            this.showCloseButton = true;
        }

    public ngOnInit(): void {
    }

    public close(): void {
        this.dialogRef.close();
    }
}

export class DialogButton {
    text: string;
    clicked: Function
}
