import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UsersService } from 'src/api/services/users-service/users.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, private userService: UsersService) { }

    public async canActivate(): Promise<boolean> {
        //Selecciono el token guardado en la memoria
        const token = localStorage.getItem("token");

        if (!token) {
            this.router.navigate(['/']);
            return false;
        }

        const response = (await this.userService.validateToken().toPromise());

        return true;
    }
}
