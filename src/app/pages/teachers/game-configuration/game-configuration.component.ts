import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-configuration',
  templateUrl: './game-configuration.component.html',
  styleUrls: ['./game-configuration.component.scss']
})
export class GameConfigurationComponent implements OnInit {

    public gameId: string;
    public classroomId: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.gameId = this.route.snapshot.params['gameId'];
        this.classroomId = this.route.snapshot.params['classroomId'];
        console.log(this.gameId);
    }

}
