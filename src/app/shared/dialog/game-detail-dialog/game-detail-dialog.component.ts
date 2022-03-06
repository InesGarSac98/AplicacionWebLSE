import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Game } from 'src/api/models/game.model';

@Component({
  selector: 'app-game-detail-dialog',
  templateUrl: './game-detail-dialog.component.html',
  styleUrls: ['./game-detail-dialog.component.scss']
})
export class GameDetailDialogComponent implements OnInit {

    public game: Game;

    constructor(private router: Router,
        public dialogRef: MatDialogRef<GameDetailDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any) {
            this.game = data.game;
        }

    public ngOnInit() {
    }

}
