import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-student-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

    public games: IGame[];
    public value = 40;

    public ngOnInit(): void {
        this.games = [
            {id:1,name:"memory",image:"./assets/images/games/memory.png"},
            {id:2, name:"quiz",image:"./assets/images/games/quiz.png"}
        ]
    }
}

export class IGame {
    id: number;
    name: string;
    image: string;
}
