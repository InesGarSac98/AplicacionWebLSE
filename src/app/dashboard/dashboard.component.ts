import { Component, OnInit } from '@angular/core';
import { Student } from 'src/api/models/student.model';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    // Array donde vamos a guardar los datos
    public users: User[] = [];
    public teachers: Teacher[] = [];
    public students: Student[] = [];

    constructor(
        private usersService: UsersService,
        private teachersService: TeachersService,
        private studentsService: StudentsService
    ) {

    }

    // Inicializamos el usuario y el profesor
    public ngOnInit(): void {
        this.initializeUsers();
        this.initializeTeachers();
        this.initializeStudents();
    }

    private initializeUsers(): void {
        this.usersService.getUsers()
            .subscribe((users: User[]) => {
                this.users = users;
                console.log(this.users);

            });
    }

    private initializeTeachers(): void {
        this.teachersService.getTeachers()
            .subscribe((teachers: Teacher[]) => {
                this.teachers = teachers;
                console.log(this.teachers);

            });
    }

    private initializeStudents(): void {
        this.studentsService.getStudents()
            .subscribe((students: Student[]) => {
                this.students = students;
                console.log(this.students);

            });
    }

}
