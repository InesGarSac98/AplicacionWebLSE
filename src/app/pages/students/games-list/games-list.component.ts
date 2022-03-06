import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/api/models/classroom.model';
import { ClassroomGame } from 'src/api/models/classroomGame';
import { Student } from 'src/api/models/student.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { StudentsService } from 'src/api/services/students-service/students.service';


@Component({
  selector: 'app-student-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
    public value = 40;

    public student: Student;
    public classroomGames: ClassroomGame[];

    constructor(
        private studentService: StudentsService,
        private classroomService: ClassroomsService
    ) {

    }

    public ngOnInit(): void {
        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.student = student;
                this.classroomService.getGamesListClassroom(student.classroomId)
                    .subscribe((classroomGames: ClassroomGame[]) => this.classroomGames = classroomGames);
            });
    }
}
