import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Classroom } from 'src/api/models/classroom.model';
import { GameStatuses } from 'src/api/models/GameEvents/gameStatuses';
import { Student } from 'src/api/models/student.model';
import { StudentStatistics } from 'src/api/models/studentStatistics.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { StatisticsService } from 'src/api/services/statistics-service/statistics.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';

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


    constructor(
        private userService: UsersService,
        private statisticsService: StatisticsService,
        private classroomService: ClassroomsService,
        private teacherService: TeachersService
        ) {

    }

    public ngOnInit(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => this.teacherService.getTeacherByUserId(user.id));

        this.getStatisticsStudentLoged();

        this.classroomService.getTeacherClassrooms(2)
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

            //TODO: Coger la lista de alumnos
        //TODO: Pasar el id del alumno



    }

    icons: Icons[] = [
        {value: '1', viewValue: 'Laravel', image: 'https://www.itsolutionstuff.com/category-images/laravel.svg'},
        {value: '2', viewValue: 'Angular', image: 'https://www.itsolutionstuff.com/category-images/angular.svg'}
    ];


    public getTimeFormated(time:number):string{
        const hours = Math.floor(time / 60 / 60);
        const minutes = Math.floor((time - hours * 60 * 60 ) / 60);
        const seconds = Math.floor((time - hours * 60 * 60 - minutes * 60));

        return (hours > 0 ? hours + 'h ' : '') +
            (minutes > 0 ? minutes + 'min ' : '') +
            seconds + 's' ;
    }

    //TODO: Cargo los estudiantes dependiendo la clase y muestro sus estadísticas
    private loadStudents() {
        this.classroomService.getStudentsListClassroom(this.classroomId)
            .subscribe((student: Student[]) => {
                this.getStatisticsStudentLoged();
                this.studentsClassroomList = student.map(s => {
                    let result = new IStudentClassroomList();
                    result.id = s.id;
                    result.name = s.user.name;
                    result.image = "./assets/images/games/memory.png";
                    return result;
                });

            });
    }


    private getStatisticsStudentLoged() {
        this.statisticsService.getStudentStatistics(5).subscribe((statistics: StudentStatistics[]) => {
            this.totalWins = statistics.filter(x => x.status === GameStatuses.WIN).length;
            this.totalLose = statistics.filter(x => x.status === GameStatuses.LOSE).length;
            this.totalAbandone = statistics.filter(x => x.status === GameStatuses.ABANDONE).length;
            this.totalGameplays = statistics.length;
            this.totalScore = statistics.map(x => x.score).reduce((accumulated, current) => accumulated + current, 0);
            this.maxScore = Math.max(...statistics.map(x => x.score));
            this.averageScore = this.totalScore / this.totalGameplays;
            this.totalTime = statistics.map(x => x.duration).reduce((accumulated, current) => accumulated + current, 0);
            this.averageTime = this.totalTime / this.totalGameplays;

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
