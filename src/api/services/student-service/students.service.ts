import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/api/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

    constructor(private http: HttpClient) { }

    // Métodos para crear un nuevo profesor en la bbdd
    public getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>('/api/teachers');
    }

    public createNewStudents(student: Student): Observable<Student> {
        return this.http.post<Student>('/api/teachers', student);
    }

}
