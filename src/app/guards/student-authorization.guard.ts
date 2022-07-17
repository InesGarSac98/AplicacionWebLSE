import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UsersService } from 'src/api/services/users-service/users.service';

@Injectable({
    providedIn: 'root'
  })
export class StudentAuthorizationGuard implements CanActivate {

    constructor(private router: Router, private userService: UsersService) { }

    public async canActivate(): Promise<boolean> {
        const response = (await this.userService.getUserLoged().toPromise());

        return response.role === 'STUDENT';
    }
}
