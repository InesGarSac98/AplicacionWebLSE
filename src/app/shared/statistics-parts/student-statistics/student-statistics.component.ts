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




    public currentDate = new Date();
    public currentMonth = new Date().getMonth()+1;
    public curr = new Date();
    public firstday: Date;
    public lastday: Date;

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
    public bestOfDay: BestStudentStatistics;
    public bestOfWeek: BestStudentStatistics;
    public bestOfMonth: BestStudentStatistics;

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
        this.firstday = this.firstDayOfWeek(new Date());
        this.lastday = new Date(this.firstday);
        this.lastday.setDate(this.firstday.getDate() + 6);
        this.getStudentStatistics();
        this.getClassroomStatistics();
    }

    public showOnlyIntegersAxisValues(val: number) {
        if (val % 1 === 0) {
            return val.toLocaleString();
        } else {
            return '';
        }
    }

    private getClassroomStatistics() {
        this.statisticsService.getClassroomStatistics(this.student.classroomId).subscribe((statistics: Statistics[]) => {
            const distinctDays = [...new Set(statistics.map(x => this.datepipe.transform(x.date, 'yyyy-MM-dd') || ''))];
            const distinctStudents = [...new Set(statistics.map(x => x.studentId))];
            this.bestOfDay = { wins: undefined, loses: undefined, played: undefined, score: undefined };
            this.bestOfWeek = { wins: undefined, loses: undefined, played: undefined, score: undefined };
            this.bestOfMonth = { wins: undefined, loses: undefined, played: undefined, score: undefined };

            distinctStudents.forEach(studentId => {
                let today: Date = new Date();
                let winsByDay: SerieData[] = this.groupByDay(statistics.filter(x => x.status === GameStatuses.WIN && x.studentId === studentId), distinctDays);
                this.classroomStudentBestStatistics('wins', winsByDay, today, studentId, statistics);

                let losesByDay: SerieData[] = this.groupByDay(statistics.filter(x => (x.status === GameStatuses.ABANDONE || x.status === GameStatuses.LOSE) && x.studentId === studentId), distinctDays);
                this.classroomStudentBestStatistics('loses', losesByDay, today, studentId, statistics);

                let playsByDay: SerieData[] = this.groupByDay(statistics.filter(x => x.studentId === studentId), distinctDays);
                this.classroomStudentBestStatistics('played', playsByDay, today, studentId, statistics);

                let scoreByDay: SerieData[] = this.groupScoreByDay(statistics.filter(x => x.studentId === studentId), distinctDays);
                this.classroomStudentBestStatistics('score', scoreByDay, today, studentId, statistics);
            });
        });
    }

    private classroomStudentBestStatistics(bestKey: string, statisticsByDay: SerieData[], today: Date, studentId: number, statistics: Statistics[]) {
        const hasToUpdateBestStatistics = (best: SerieData | undefined, current: SerieData | undefined) => {
            return (best === undefined && current !== undefined) ||
                (best !== undefined && current !== undefined && best.value < current.value);
        };

        let todayStatistics = statisticsByDay.find(x => x.name === this.datepipe.transform(today, 'yyyy-MM-dd'));

        let weekData = statisticsByDay.filter(x => x.name >= (this.datepipe.transform(this.firstDayOfWeek(today), 'yyyy-MM-dd') || '')).reduce((acc, curr) => { return acc + curr.value; }, 0)
        let weekStatistics = { name: weekData ? studentId + '' : '' , value: weekData } as SerieData;
        let monthData = statisticsByDay.filter(x => x.name > (this.datepipe.transform(new Date(today).setDate(1), 'yyyy-MM-dd') || '')).reduce((acc, curr) => { return acc + curr.value; }, 0);
        let monthStatistics = { name: monthData ? studentId + '' : '' , value: monthData } as SerieData;

        if (hasToUpdateBestStatistics((this.bestOfDay as any)[bestKey], todayStatistics)) {
            const todayName = todayStatistics?.name || '';
            (this.bestOfDay as any)[bestKey] = {
                name: statistics.find(s => s.studentId.toString() === todayName)?.studentName || '',
                value: todayStatistics?.value || 0
            };
        }

        if (hasToUpdateBestStatistics((this.bestOfWeek as any)[bestKey], weekStatistics)) {
            const weekName = weekStatistics?.name || '';
            (this.bestOfWeek as any)[bestKey] = {
                name: statistics.find(s => s.studentId.toString() === weekName)?.studentName || '',
                value: weekStatistics?.value || 0
            };
        }

        if (hasToUpdateBestStatistics((this.bestOfMonth as any)[bestKey], monthStatistics)) {
            const monthName = monthStatistics?.name || '';
            (this.bestOfMonth as any)[bestKey] = {
                name: statistics.find(s => s.studentId.toString() === monthName)?.studentName || '',
                value: monthStatistics?.value || 0
            };
        }
    }

    private firstDayOfWeek(date: Date) {
        const dayOfWeek = date.getDay();
        const firstDayOfWeek = new Date(date);
        const diff = dayOfWeek >= 1 ? dayOfWeek - 1 : 6 - dayOfWeek

        firstDayOfWeek.setDate(date.getDate() - diff)

        return firstDayOfWeek
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

    private groupScoreByDay(arr: Statistics[], keys: string[]): SerieData[] {
        let seriesData: SerieData[] = keys.map(k => {
            return {
                name: k,
                value: 0
            };
        })

        arr.forEach(s => {
            const key: any = this.datepipe.transform(s.date, 'yyyy-MM-dd') || '';
            let data: SerieData = seriesData.find(x => x.name === key) as SerieData;
            data.value += s.score;
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

class BestStudentStatistics {
    wins: SerieData | undefined;
    loses: SerieData | undefined;
    played: SerieData | undefined;
    score: SerieData | undefined;
}
