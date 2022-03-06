import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Classroom } from 'src/api/models/classroom.model';
import { Student } from 'src/api/models/student.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: User;
    public student: Student;
    public classroom: Classroom;

    constructor(
        private userService: UsersService,
        private studentService: StudentsService,
        private classroomService: ClassroomsService
    ) {

    }

    public ngOnInit(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => this.user = user);

        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.student = student;
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

}

interface Icons {
    value: string;
    viewValue: string;
    image: string;
  }
