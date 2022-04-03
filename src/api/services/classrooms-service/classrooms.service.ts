import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from 'src/api/models/classroom.model';
import { ClassroomGame } from 'src/api/models/classroomGame';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { Student } from 'src/api/models/student.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService extends CommonApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    // Métodos para crear una nueva clase en la bbdd
    public getClassrooms(): Observable<Classroom[]> {
        return this.get<Classroom[]>('/api/classrooms');
    }

    public getClassroom(classroomId: number): Observable<Classroom> {
        return this.get<Classroom>('/api/classrooms/' + classroomId);
    }

    public createNewClassroom(classroom: Classroom): Observable<Classroom> {
        return this.post<Classroom>('/api/classrooms', classroom);
    }

    public getTeacherClassrooms(teacherId: number): Observable<Classroom[]>{
        return this.get<Classroom[]>('/api/teachers/'+ teacherId + '/classrooms');
    }

    public getStudentsListClassroom(classroomId:number): Observable<Student[]> {
        return this.get<Student[]>('/api/classrooms/' + classroomId + '/students');
    }

    public getWordsListClassroom(classroomId:number): Observable<ClassroomWord[]> {
        return this.get<ClassroomWord[]>('/api/classrooms/' + classroomId + '/words');
    }

    public getGamesListClassroom(classroomId:number): Observable<ClassroomGame[]> {
        return this.get<ClassroomGame[]>('/api/classrooms/' + classroomId + '/games');
    }
}
