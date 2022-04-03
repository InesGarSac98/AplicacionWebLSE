import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-game-configuration',
  templateUrl: './memory-game-configuration.component.html',
  styleUrls: ['./memory-game-configuration.component.scss']
})
export class MemoryGameConfigurationComponent implements OnInit {

    public gameId: number;
    public classroomId: number;

    constructor() { }

    ngOnInit() {
    }

}
