import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/api/models/game.model';
import { Student } from 'src/api/models/student.model';
import { StudentLearnedWord } from 'src/api/models/studentLearnedWords.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
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
    public learnedWordsByGameChart: SerieData[];

    private games: Game[];

    constructor(
        private studentLearnedWordsService: StudentLearnedWordsService,
        private classroomService: ClassroomsService,
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
            yAxisLabel: 'Juegos',
            xAxisLabel: 'Número de palabras',
            timeline: false,
            colorScheme: {
                domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
            }
        };
    }

    public async ngOnInit() {
        this.games = (await this.classroomService.getGamesListClassroom(this.student.classroomId).toPromise()).map(x => x.game);
        this.getStudentLearnedWords();
    }

    private getStudentLearnedWords() {
        this.studentLearnedWordsService.getStudentLearnedWords(this.student.id).subscribe((words: StudentLearnedWord[]) => {
            this.learnedWordsByGameChart = this.groupByGame(words, this.games);
        });
    }

    private groupByGame(arr: StudentLearnedWord[], games: Game[]): SerieData[] {
        let serieArray: SerieData[] = games.map(g => {
            return {
                name: g.name,
                value: 0
            } as SerieData
        });

        arr.forEach(s => {
            let serie = serieArray.find(x => x.name === games.find(g => g.id === s.gameId)?.name);
            if (serie) {
                serie.value++;
            }
        });

        return serieArray;
    }
}
