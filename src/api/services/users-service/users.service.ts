import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/api/models/user.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends CommonApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getUsers(): Observable<User[]> {
        return this.get<User[]>('/api/users');
    }

    public getUserLoged(): Observable<User> {
        return this.get<User>('/api/users/user-loged');
    }

    public createNewUser(user: User): Observable<User> {
        return this.post<User>('/api/users', user);
    }

    public login(name:string, password: string): Observable<any> {
        return this.post<User>(
            '/api/users/login/',
            {
                name: name,
                password: password
            });
    }

    public validateToken(): Observable<any> {
        return this.post<User>('/api/users/validate-token/', {});
    }

}
