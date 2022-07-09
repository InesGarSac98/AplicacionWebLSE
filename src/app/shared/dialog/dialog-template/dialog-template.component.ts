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

    public word: Word;
    @Input() public showEditButton: boolean = true;
    @Input() public showWordDetails: boolean = true;
    @Input() public closeSession: boolean = true;

    constructor(private router: Router,
        public dialogRef: MatDialogRef<DialogTemplateComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any) {
            this.word = data.word;
        }

    public ngOnInit() {
    }

    public add() {
        //TODO: Add word to the dictionary
    }

    public close() {
        this.dialogRef.close();
    }

    public acceptEndSession() {
        this.dialogRef.close();
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }


}
