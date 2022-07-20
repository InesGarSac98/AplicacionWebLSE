import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomWordsService extends CommonApiService{

    constructor(http: HttpClient) {
        super(http);
    }

    public createClassroomWord(wordId: number, classroomId: number): Observable<ClassroomWord> {
        return this.post<ClassroomWord>('/api/classroomWords/', {classroomId: classroomId, wordId: wordId});
    }

    public deleteClassroomWord(id: number): Observable<void> {
        return this.delete<void>('/api/classroomWords/' + id);
    }
}
