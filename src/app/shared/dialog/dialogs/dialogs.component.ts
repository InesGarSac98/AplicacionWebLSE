import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Word } from 'src/api/models/word.model';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';

@Component({
    selector: 'app-dialogs',
    templateUrl: './dialogs.component.html',
    styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
    public word: Word;

    constructor(private router: Router,
        public dialogRef: MatDialogRef<DialogsComponent>
        ) {
        }
    public ngOnInit() {
    }

    public accept() {
        this.dialogRef.close();
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    public close() {
        this.dialogRef.close();
    }
}
