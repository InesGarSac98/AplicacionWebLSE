import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-student-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    public gameId: string;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.gameId = this.route.snapshot.params['gameId'];
        console.log(this.gameId);

    }

}
