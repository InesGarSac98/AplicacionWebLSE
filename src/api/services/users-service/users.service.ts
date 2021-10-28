import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/api/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) { }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>('/api/users');
    }

    public createNewUser(user: User): Observable<User> {
        return this.http.post<User>('/api/users', user);
    }

}
