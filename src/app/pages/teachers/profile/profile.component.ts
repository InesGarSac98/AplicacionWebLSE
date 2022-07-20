import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Classroom } from 'src/api/models/classroom.model';
import { GameStatuses } from 'src/api/models/GameEvents/gameStatuses';
import { Student } from 'src/api/models/student.model';
import { Statistics } from 'src/api/models/statistics.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { StatisticsService } from 'src/api/services/statistics-service/statistics.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { Teacher } from 'src/api/models/teacher.model';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { AppComponent } from 'src/app/app.component';
import { SerieData } from 'src/app/shared/statistics-parts/SerieData';
import { DatePipe } from '@angular/common';
import { Serie } from 'src/app/shared/statistics-parts/Serie';
import { CellDefinition, SelectableItem } from 'src/app/shared/multi-select-list/multi-select-list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public statistiscLoaded: boolean = false;
    public userName: string;
    public totalWins: number;
    public totalGameplays: number;
    public totalLose: number;
    public totalAbandone: number;
    public totalScore: number;
    public maxScore: number;
    public averageScore: number;
    public totalTime: number;
    public averageTime: number;
    public currentDate = new Date();
    public currentMonth = new Date().getMonth()+1;
    public curr = new Date();
    public firstday: Date;
    public lastday: Date;
    public classroomId: number;
    public studentsClassroomList: IStudentClassroomList[];
    @Input() public student: Student;
    public classrooms: IClassroomList[];
    public bestOfDay: BestStudentStatistics;
    public bestOfWeek: BestStudentStatistics;
    public bestOfMonth: BestStudentStatistics;
    private notifications: NotificationComponent;
    public dataLoaded: boolean = false;
    public winLoseDayChart: Serie[];
    public studentsCellDefinitions: CellDefinition[];
    public rawStatistics: Statistics[];
    @Input() public statistics: Statistics[];
    public statisticsAssociation: StatisticsSelectableItem[] = [];

    constructor(
        app: AppComponent,
        private datepipe: DatePipe,
        private userService: UsersService,
        private statisticsService: StatisticsService,
        private classroomService: ClassroomsService,
        private teacherService: TeachersService
    ) {
        this.notifications = app.getNotificationsComponent();
        this.studentsCellDefinitions = [
            {
                header: 'Alumno',
                itemKey: 'studentName',
                isImage: false
            },
            {
                header: 'Victorias',
                itemKey: 'victory',
                isImage: false
            },
            {
                header: 'Derrotas',
                itemKey: 'loss',
                isImage: false
            },
            {
                header: 'Abandonos',
                itemKey: 'abandoned',
                isImage: false
            },
            {
                header: 'Puntuación',
                itemKey: 'score',
                isImage: false
            },
            {
                header: 'Tiempo total',
                itemKey: 'time',
                isImage: false
            }
        ];

    }

    public ngOnInit(): void {
        this.firstday = this.firstDayOfWeek(new Date());
        this.lastday = new Date(this.firstday);
        this.lastday.setDate(this.firstday.getDate() + 6);
        this.userService.getUserLoged()
            .subscribe((user: User) => {
                this.teacherService.getTeacherByUserId(user.id)
                    .subscribe((teacher: Teacher) => {
                        this.classroomService.getTeacherClassrooms(teacher.id)
                            .subscribe((classrooms: Classroom[])=>{
                                this.classrooms = classrooms.map(c => {
                                    let result = new IClassroomList();
                                    result.id = c.id;
                                    result.name = c.name;
                                    result.numStudents = c.students.length;
                                    return result;
                                });
                            });
                    })
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

    public getClassroomStatisticsOld(classroomId: number) {
        this.rawStatistics = [];
        this.statisticsService.getClassroomStatistics(classroomId).subscribe((statistics: Statistics[]) => {
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
            this.classroomId = classroomId;
            this.getClassroomStatistics();
            this.getClassroomStatisticsByStudents();
        });
    }

    public getClassroomStatisticsByStudents(){
        this.dataLoaded = false;
        this.statisticsService.getClassroomStatistics(this.classroomId).subscribe((statistics: Statistics[]) => {
            const distinctStudents = new Set([...statistics.map(x => x.studentId)]);
            this.statisticsAssociation = [];
            distinctStudents.forEach(studentId => {
                const totalWins = statistics.filter(x => x.studentId === studentId && x.status === GameStatuses.WIN).length;
                const totalStudentLose = statistics.filter(x => x.studentId === studentId && x.status === GameStatuses.LOSE).length;
                const totalStudentAbandone = statistics.filter(x => x.studentId === studentId && x.status === GameStatuses.ABANDONE).length;
                const studentTotalTime = statistics.filter(x => x.studentId === studentId).reduce((acc, curr) => acc + curr.duration, 0);
                const studentTotalScore = statistics.filter(x => x.studentId === studentId).reduce((acc, curr) => acc + curr.score, 0);
                const studentName = statistics.find(s => s.studentId === studentId)?.studentName || '';
                this.statisticsAssociation.push({
                    id: studentId,
                    studentName: studentName,
                    viewName: studentName,
                    isChecked: false,
                    victory: totalWins,
                    loss: totalStudentLose,
                    abandoned: totalStudentAbandone,
                    score: studentTotalScore,
                    time: this.getTimeFormated(studentTotalTime)
                });
            });
            this.dataLoaded = true;
        });
    }

    public showOnlyIntegersAxisValues(val: number) {
        if (val % 1 === 0) {
            return val.toLocaleString();
        } else {
            return '';
        }
    }

    private getClassroomStatistics() {
        this.statisticsService.getClassroomStatistics(this.classroomId).subscribe((statistics: Statistics[]) => {
            this.rawStatistics = statistics;
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



}

class BestStudentStatistics {
    wins: SerieData | undefined;
    loses: SerieData | undefined;
    played: SerieData | undefined;
    score: SerieData | undefined;
}

export class IStudentClassroomList {
    id: number;
    name: string;
    image: string;
}

export class IClassroomList {
    id: number;
    name: string;
    numStudents: number;
}

class StatisticsSelectableItem extends SelectableItem {
    studentName: string;
    victory: number;
    loss: number;
    abandoned: number;
    score: number;
    time: string;
}
