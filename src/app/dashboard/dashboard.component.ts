import { Component, OnInit } from '@angular/core';
import { User } from 'src/api/models/user.model';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public users: User[] = [];

    constructor(private usersService: UsersService) {

    }

    public ngOnInit(): void {
        this.initializeUsers();
    }

    private initializeUsers(): void {
        this.usersService.getUsers()
            .subscribe((users: User[]) => {
                this.users = users;
                console.log(this.users);

            });
    }

}
