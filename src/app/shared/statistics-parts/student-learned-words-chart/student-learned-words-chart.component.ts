import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/api/models/game.model';
import { Student } from 'src/api/models/student.model';
import { StudentLearnedWord } from 'src/api/models/studentLearnedWords.model';
import { GamesService } from 'src/api/services/games-service/games.service';
import { StudentLearnedWordsService } from 'src/api/services/student-learned-words-service/student-learned-words.service';
import { NgxInputData } from '../NgxInputData';
import { Serie } from '../Serie';
import { SerieData } from '../SerieData';

@Component({
    selector: 'app-student-learned-words-chart',
    templateUrl: './student-learned-words-chart.component.html',
    styleUrls: ['./student-learned-words-chart.component.scss']
})
export class StudentLearnedWordsChartComponent implements OnInit {
    @Input() public student: Student;

    public learnedWordsByGameChartInputData: NgxInputData;
    public learnedWordsByGameChart: Serie[];

    private games: Game[];

    constructor(
        private datepipe: DatePipe,
        private studentLearnedWordsService: StudentLearnedWordsService,
        private gamesService: GamesService
    )
    {
        this.learnedWordsByGameChartInputData = {
            legend: true,
            showLabels: true,
            animations: true,
            xAxis: true,
            yAxis: true,
            showYAxisLabel: true,
            showXAxisLabel: true,
            xAxisLabel: 'Juegos',
            yAxisLabel: 'Número de palabras',
            timeline: false,
            colorScheme: {
                domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
            }
        };
    }

    public async ngOnInit() {
        this.games = await this.gamesService.getGamesList().toPromise();
        this.getStudentLearnedWords();
    }

    private getStudentLearnedWords() {
        this.studentLearnedWordsService.getStudentLearnedWords(this.student.id).subscribe((words: StudentLearnedWord[]) => {
            const keys = this.games.map(x => x.name);
            this.learnedWordsByGameChart = this.games.map(g => {
                return {
                    name: g.name,
                    series: this.groupByGame(words.filter(x => x.gameId === g.id), keys)
                }
            });
        })
    }

    private groupByGame(arr: StudentLearnedWord[], keys: string[]): SerieData[] {
        let seriesData: SerieData[] = keys.map(k => {
            return {
                name: k,
                value: 0
            };
        })

        arr.forEach(s => {
            const key: any = this.datepipe.transform(s.date, 'yyyy-MM-dd') || '';
            let data: SerieData = seriesData.find(x => x.name === key) as SerieData;
            data.value++;
        });

        return seriesData;
    }
}
