import { Component, Input, OnInit } from '@angular/core';
import { Serie } from '../Serie';
import { StudentLearnedWord } from 'src/api/models/studentLearnedWords.model';
import { SerieData } from '../SerieData';
import { Statistics } from 'src/api/models/statistics.model';
import { NgxInputData } from '../NgxInputData';
import { StudentLearnedWordsService } from 'src/api/services/student-learned-words-service/student-learned-words.service';
import { GameStatuses } from 'src/api/models/GameEvents/gameStatuses';

@Component({
    selector: 'app-teacher-classroom-statistics',
    templateUrl: './teacher-classroom-statistics.component.html',
    styleUrls: ['./teacher-classroom-statistics.component.scss']
})
export class TeacherClassroomStatisticsComponent implements OnInit {
    @Input() public statistics: Statistics[];

    public winLoseChartInputData: NgxInputData;
    public winLoseChart: Serie[];
    public winLoseChartLoaded: boolean;

    public learnedWordsChartInputData: NgxInputData;
    public learnedWordsByGameChart: Serie[];
    public learnedWordsByGameChartLoaded: boolean;

    view: any[] = [700, 400];


    colorScheme = {
      domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    };

    constructor(
        private studentLearnedWordsSerive: StudentLearnedWordsService
    ) {
        this.learnedWordsChartInputData = {
            legend: true,
            showLabels: true,
            animations: true,
            xAxis: true,
            yAxis: true,
            showYAxisLabel: true,
            showXAxisLabel: true,
            xAxisLabel: 'Número de palabras por juego',
            yAxisLabel:'Estudiantes',
            timeline: false,
            colorScheme: {
                domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
            }
        };

        this.winLoseChartInputData = {
            legend: true,
            showLabels: true,
            animations: true,
            xAxis: true,
            yAxis: true,
            showYAxisLabel: true,
            showXAxisLabel: true,
            xAxisLabel: 'Estudiantes',
            yAxisLabel: 'Número de partidas',
            timeline: false,
            colorScheme: {
                domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
            }
        };
     }

    public async ngOnInit() {
        this.learnedWordsByGameChartLoaded = false;
        this.winLoseChartLoaded = false;

        const distinctStudents = new Set([...this.statistics.map(x => x.studentId)]);
        const distinctGames = new Set([...this.statistics.map(x => x.gameId)]);

        this.learnedWordsByGameChart = [];
        this.winLoseChart = [];

        for (const studentId of distinctStudents) {
            let learnedWords: StudentLearnedWord[] = await this.studentLearnedWordsSerive.getStudentLearnedWords(studentId).toPromise();
            let studentLearnedWordSerie = {
                name: this.statistics.find(s => s.studentId === studentId)?.studentName || '',
                series: [...distinctGames].map(g => {
                    return {
                        name: this.statistics.find(s => s.gameId === g)?.gameName || '',
                        value: 0
                    } as SerieData;
                })
            } as Serie;

            this.groupStudentLearnedWordByGame(studentLearnedWordSerie, learnedWords, this.statistics.map(s => ({id: s.gameId, name: s.gameName})));

            this.learnedWordsByGameChart.push(studentLearnedWordSerie);

            let studentWinLoseSerie = {
                name: this.statistics.find(s => s.studentId === studentId)?.studentName || '',
                series: [
                    {
                        name: 'Victorias',
                        value: this.statistics.filter(s => s.studentId === studentId && s.status === GameStatuses.WIN).length
                    },
                    {
                        name: 'Derrotas',
                        value: this.statistics.filter(s => s.studentId === studentId && s.status === GameStatuses.LOSE).length
                    },
                    {
                        name: 'Abandonos',
                        value: this.statistics.filter(s => s.studentId === studentId && s.status === GameStatuses.ABANDONE).length
                    }
                ] as SerieData[]
            } as Serie;

            this.winLoseChart.push(studentWinLoseSerie);
        }

        this.learnedWordsByGameChartLoaded = true;
        this.winLoseChartLoaded = true;
    }

    public showOnlyIntegersAxisValues(val: number) {
        if (val % 1 === 0) {
            return val.toLocaleString();
        } else {
            return '';
        }
    }

    private groupStudentLearnedWordByGame(serie: Serie, learnedWords: StudentLearnedWord[], gmaes: {id: number, name: string}[]): void {
        learnedWords.forEach(w => {
            let data: SerieData | undefined = serie.series.find(x => x.name === gmaes.find(g => g.id === w.gameId)?.name);
            if (data) {
                data.value++;
            }
        });
    }
}
