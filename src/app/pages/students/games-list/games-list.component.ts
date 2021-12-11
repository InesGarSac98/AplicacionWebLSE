import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

    public games: IGame[];

    public ngOnInit(): void {
        this.games = [
            {id:1,name:"memory"},
            {id:2, name:"quiz"}
        ]
    }
}

export class IGame {
    id: number;
    name: string;
}
