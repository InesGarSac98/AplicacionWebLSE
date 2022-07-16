import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentLearnedWord } from 'src/api/models/studentLearnedWords.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentLearnedWordsService extends CommonApiService {


    constructor(http: HttpClient) {
        super(http);
    }

    public getStudentLearnedWords(studentId: number): Observable<StudentLearnedWord[]> {
        return this.get<StudentLearnedWord[]>('/api/studentLearnedWords?studentId=' + studentId);
    }

    public saveStudentLearnedWords(word: StudentLearnedWord): Observable<StudentLearnedWord> {
        return this.post<StudentLearnedWord>('/api/studentLearnedWords', word);
    }
}
