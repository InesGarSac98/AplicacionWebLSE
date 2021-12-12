import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class StudentAvailableGameService {

constructor(private http: HttpClient) { }

    // Métodos para crear un nuevo profesor en la bbdd
    public getStudentsAvailableGame(): Observable<StudentAvailableGameService[]> {
        return this.http.get<StudentAvailableGameService[]>('/api/studentsAvailableGame');
    }

    public createNewStudentsAvailableGame(studentAvGa: StudentAvailableGameService): Observable<StudentAvailableGameService> {
        return this.http.post<StudentAvailableGameService>('/api/studentsAvailableGame', studentAvGa);
    }

}
