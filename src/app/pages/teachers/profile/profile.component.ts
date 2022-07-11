import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

    public classroomId: number;
    public studentsClassroomList: IStudentClassroomList[];
    public student: Student;
    public classrooms: IClassroomList[];

    private notifications: NotificationComponent;

    constructor(
        app: AppComponent,
        private userService: UsersService,
        private statisticsService: StatisticsService,
        private classroomService: ClassroomsService,
        private teacherService: TeachersService
    ) {
        this.notifications = app.getNotificationsComponent();
    }

    public ngOnInit(): void {
        //this.elToast.toast('show');
        this.userService.getUserLoged()
            .subscribe((user: User) => {
                this.teacherService.getTeacherByUserId(user.id)
                    .subscribe((teacher: Teacher) => {
                        this.classroomService.getTeacherClassrooms(teacher.id)
                            .subscribe((classrooms: Classroom[])=>{

                                console.log(classrooms);
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



            //TODO: Coger la lista de alumnos
        //TODO: Pasar el id del alumno



    }


    public getTimeFormated(time:number):string{
        const hours = Math.floor(time / 60 / 60);
        const minutes = Math.floor((time - hours * 60 * 60 ) / 60);
        const seconds = Math.floor((time - hours * 60 * 60 - minutes * 60));

        return (hours > 0 ? hours + 'h ' : '') +
            (minutes > 0 ? minutes + 'min ' : '') +
            seconds + 's' ;
    }

    public getClassroomStatistics(classroomId: number) {
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
        });
    }

}

interface Icons {
    value: string;
    viewValue: string;
    image: string;
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
