import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/api/models/user.model';
import { UsersService } from 'src/api/services/users-service/users.service';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}


@Injectable()
export class MenuItems {
    // public formGroup: FormGroup;

    // public menuRole():any{
    //     this.userService
    //         .login(this.formGroup.controls.name.value, this.formGroup.controls.password.value)
    //         .subscribe((response: any) => {
    //             localStorage.setItem('token', response.token);
    //             this.userService.getUserLoged().subscribe((user: User) => {
    //
    //             });

    //         }
    //     )
    // }

    public MENUITEMS: Menu[];

    public role: string;

    public setUserLoggedRole(role: string) {
        this.role = role.toLowerCase();
        if (this.role === 'student') {
            this.MENUITEMS = [
                { state: 'students/profile', type: 'link', name: 'Profile', icon: 'school' },
                { state: 'students/games', type: 'link', name: 'Games', icon: 'casino' },
                { state: 'students/progress', type: 'link', name: 'Progress', icon: 'poll' },
                { state: 'students/review', type: 'link', name: 'Review', icon: 'sync' }

            ];
        }
        else if (this.role === 'teacher') {
            this.MENUITEMS = [
                { state: 'teachers/profile', type: 'link', name: 'Profile', icon: 'school' },
                { state: 'teachers/games', type: 'link', name: 'Games', icon: 'casino' },
                { state: 'teachers/classrooms', type: 'link', name: 'Classrooms', icon: 'supervisor_account' }

            ];
        }
    }

    public getMenuitem(): Menu[] {
        return this.MENUITEMS;
    }



}
