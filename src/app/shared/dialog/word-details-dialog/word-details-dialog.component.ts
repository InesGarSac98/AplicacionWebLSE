import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Word } from 'src/api/models/word.model';

@Component({
  selector: 'app-word-details-dialog',
  templateUrl: './word-details-dialog.component.html',
  styleUrls: ['./word-details-dialog.component.scss']
})
export class WordDetailsDialogComponent implements OnInit {

    public word: Word;

    constructor(private router: Router,
        public dialogRef: MatDialogRef<WordDetailsDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any) {
            this.word = data.word;
        }

    public ngOnInit() {
    }

}
