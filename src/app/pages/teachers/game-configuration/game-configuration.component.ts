import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-configuration',
  templateUrl: './game-configuration.component.html',
  styleUrls: ['./game-configuration.component.scss']
})
export class GameConfigurationComponent implements OnInit {

    public gameId: string;
    public classroomId: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.gameId = this.route.snapshot.params['gameId'];
        this.classroomId = this.route.snapshot.params['classroomId'];
        console.log(this.gameId);
    }

    public goBackClicked(){
        this.router.navigate(['teachers/classrooms', this.classroomId, 'add-games']);
    }

}
