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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

    constructor(
        private userService: UsersService,
        private studentService: StudentsService,
        private classroomService: ClassroomsService,
        private statisticsService: StatisticsService
    ) {

    }

    public ngOnInit(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => this.user = user);

        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.student = student;
                this.getStudentStatistics();
                this.classroomService.getClassroom(student.classroomId)
                    .subscribe((classroom: Classroom) => this.classroom = classroom);
        });
    }

    icons: Icons[] = [
        {value: '1', viewValue: 'Laravel', image: 'https://www.itsolutionstuff.com/category-images/laravel.svg'},
        {value: '2', viewValue: 'Angular', image: 'https://www.itsolutionstuff.com/category-images/angular.svg'},
        {value: '3', viewValue: 'Bootstrap', image: 'https://www.itsolutionstuff.com/category-images/bootstrap.svg'},
        {value: '4', viewValue: 'JS', image: 'https://www.itsolutionstuff.com/category-images/javascript.svg'},
        {value: '5', viewValue: 'Git', image: 'https://www.itsolutionstuff.com/category-images/git.png'}
      ];

    private getStudentStatistics() {
        this.statisticsService.getStudentStatistics(this.student.id).subscribe((statistics: Statistics[]) => {
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
