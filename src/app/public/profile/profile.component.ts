import { Component, OnInit } from '@angular/core';
import { User } from 'src/api/models/user.model';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public userName: string;

    constructor(private userService: UsersService) {

    }

    public ngOnInit(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => this.userName = user.name);
    }

}
