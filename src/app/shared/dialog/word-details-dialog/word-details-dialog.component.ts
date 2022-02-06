import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-details-dialog',
  templateUrl: './word-details-dialog.component.html',
  styleUrls: ['./word-details-dialog.component.scss']
})
export class WordDetailsDialogComponent implements OnInit {

    public wordName: string;
    public wordVideo: string;
    public wordImage: string;

    constructor(private router: Router,
        public dialogRef: MatDialogRef<WordDetailsDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any) {
            this.wordName = data.wordName;
            this.wordVideo = data.wordVideo;
            this.wordImage = data.wordImage;
        }

    public ngOnInit() {
    }

}
