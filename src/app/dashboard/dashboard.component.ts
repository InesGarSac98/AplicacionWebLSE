import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public users: User[] = [];
    public teachers: Teacher[] = [];

    constructor(
        private usersService: UsersService,
        private teachersService: TeachersService
    ) {

    }

    public ngOnInit(): void {
        this.initializeUsers();
        this.initializeTeachers();
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

}
