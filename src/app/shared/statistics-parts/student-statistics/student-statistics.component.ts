import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameStatuses } from 'src/api/models/GameEvents/gameStatuses';
import { Statistics } from 'src/api/models/statistics.model';
import { Student } from 'src/api/models/student.model';
import { StatisticsService } from 'src/api/services/statistics-service/statistics.service';
import { NgxInputData } from '../NgxInputData';
import { Serie } from '../Serie';
import { SerieData } from '../SerieData';

@Component({
    selector: 'app-student-statistics',
    templateUrl: './student-statistics.component.html',
    styleUrls: ['./student-statistics.component.scss']
})
export class StudentStatisticsComponent implements OnInit {
    @Input() public student: Student;

    public view: any[] = [500, 300];

    public winLoseChartInputData: NgxInputData;

    public totalWins: number;
    public totalGameplays: number;
    public totalLose: number;
    public totalAbandone: number;
    public totalScore: number;
    public maxScore: number;
    public averageScore: number;
    public totalTime: number;
    public averageTime: number;
    public winLoseDayChart: Serie[];

    public statistiscLoaded: boolean = false;

    constructor(
        private datepipe: DatePipe,
        private statisticsService: StatisticsService
    ) {
        this.winLoseChartInputData = {
            legend: true,
            showLabels: true,
            animations: true,
            xAxis: true,
            yAxis: true,
            showYAxisLabel: true,
            showXAxisLabel: true,
            xAxisLabel: 'Día',
            yAxisLabel:'Número de partidas',
            timeline: false,
            colorScheme: {
                domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
            }
        };
    }

    public ngOnInit() {
        this.getStudentStatistics();

    }

    private groupByDay(arr: Statistics[], keys: string[]): SerieData[] {
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

    private getStudentStatistics() {
        this.statisticsService.getStudentStatistics(this.student.id).subscribe((statistics: Statistics[]) => {
            const distinctDays = [...new Set(statistics.map(x => this.datepipe.transform(x.date, 'yyyy-MM-dd') || ''))];
            this.winLoseDayChart =[
                {
                    name: "Victorias",
                    series: this.groupByDay(statistics.filter(x => x.status === GameStatuses.WIN), distinctDays)
                },
                {
                    name: "Derrotas",
                    series: this.groupByDay(statistics.filter(x => x.status === GameStatuses.LOSE), distinctDays)
                },
                {
                    name: "Abandonos",
                    series: this.groupByDay(statistics.filter(x => x.status === GameStatuses.ABANDONE), distinctDays)
                }
            ];
            this.totalWins = statistics.filter(x => x.status === GameStatuses.WIN).length;
            this.totalLose = statistics.filter(x => x.status === GameStatuses.LOSE).length;
            this.totalAbandone = statistics.filter(x => x.status === GameStatuses.ABANDONE).length;
            this.totalGameplays = statistics.length;
            this.totalScore = statistics.map(x => x.score).reduce((accumulated, current) => accumulated + current, 0);
            this.maxScore = Math.max(...statistics.map(x => x.score), 0);
            this.averageScore = this.totalGameplays === 0 ? 0 : this.totalScore / this.totalGameplays;
            this.totalTime = statistics.map(x => x.duration).reduce((accumulated, current) => accumulated + current, 0);
            this.averageTime = this.totalGameplays === 0 ? 0 : this.totalTime / this.totalGameplays;

            this.statistiscLoaded = true;
        });
    }

    public getTimeFormated(time:number):string{
        const hours = Math.floor(time / 60 / 60);
        const minutes = Math.floor((time - hours * 60 * 60 ) / 60);
        const seconds = Math.floor((time - hours * 60 * 60 - minutes * 60));

        return (hours > 0 ? hours + 'h ' : '') +
            (minutes > 0 ? minutes + 'min ' : '') +
            seconds + 's' ;
    }
}
