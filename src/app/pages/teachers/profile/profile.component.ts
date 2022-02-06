import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
