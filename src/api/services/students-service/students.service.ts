import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/api/models/student.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends CommonApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    public getStudent(studentId: number): Observable<Student> {
        return this.get<Student>('/api/students/' + studentId);
    }

    public getStudents(): Observable<Student[]> {
        return this.get<Student[]>('/api/students');
    }

    public getStudentLoged(): Observable<Student> {
        return this.get<Student>('/api/students/student-loged');
    }

    public createNewStudents(student: Student): Observable<Student> {
        return this.post<Student>('/api/students', student);
    }

}
