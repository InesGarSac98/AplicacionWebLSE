import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/api/models/teacher.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService extends CommonApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    public getTeacherLoged(): Observable<Teacher> {
        return this.get<Teacher>('/api/teachers/teacher-loged');
    }

    public getTeacherByUserId(userId: number): Observable<Teacher> {
        return this.get<Teacher>('/api/teachers?userId='+ userId);
    }

    public createNewTeacher(teacher: Teacher): Observable<Teacher> {
        return this.post<Teacher>('/api/teachers', teacher);
    }

}
