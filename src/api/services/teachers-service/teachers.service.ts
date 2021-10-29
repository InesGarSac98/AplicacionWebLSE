import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/api/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

    constructor(private http: HttpClient) { }

    public getTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>('/api/teachers');
    }

    public createNewTeacher(teacher: Teacher): Observable<Teacher> {
        return this.http.post<Teacher>('/api/teachers', teacher);
    }

}
