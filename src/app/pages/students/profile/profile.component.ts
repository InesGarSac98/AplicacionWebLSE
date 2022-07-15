import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Classroom } from 'src/api/models/classroom.model';
import { GameStatuses } from 'src/api/models/GameEvents/gameStatuses';
import { Student } from 'src/api/models/student.model';
import { Statistics } from 'src/api/models/statistics.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { StatisticsService } from 'src/api/services/statistics-service/statistics.service';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public view: any[] = [500, 300];

    // options
    public legend: boolean = true;
    public showLabels: boolean = true;
    public animations: boolean = true;
    public xAxis: boolean = true;
    public yAxis: boolean = true;
    public showYAxisLabel: boolean = true;
    public showXAxisLabel: boolean = true;
    public xAxisLabel: string = 'Día';
    public yAxisLabel: string = 'Número de partidas';
    public timeline: boolean = true;

    public colorScheme = {
      domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

    onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }












    public statistiscLoaded: boolean = false;
    public user: User;
    public student: Student;
    public classroom: Classroom;
    public totalWins: number;
    public totalGameplays: number;
    public totalLose: number;
    public totalAbandone: number;
    public totalScore: number;
    public maxScore: number;
    public averageScore: number;
    public totalTime: number;
    public averageTime: number;
    public alert:boolean = false;
    public winLoseDayChart: Serie[];

    constructor(
        private datepipe: DatePipe,
        private userService: UsersService,
        private studentService: StudentsService,
        private classroomService: ClassroomsService,
        private statisticsService: StatisticsService
    ) {
    }

    public ngOnInit(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => this.user = user);
            this.alert = true;

        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.student = student;
                this.getStudentStatistics();
                this.classroomService.getClassroom(student.classroomId)
                    .subscribe((classroom: Classroom) => this.classroom = classroom);
        });
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

interface Icons {
    value: string;
    viewValue: string;
    image: string;
  }

  export class Serie {
    name: string;
    series: SerieData[]
}

export class SerieData {
    name: string;
    value: number;
}
