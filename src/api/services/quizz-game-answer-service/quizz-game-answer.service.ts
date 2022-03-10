import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/api/models/teacher.model';
import { Word } from 'src/api/models/word.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizzGameAnswerService extends CommonApiService{

    constructor(http: HttpClient) {
        super(http);
    }

    public getQuizzGameQuestionsByWordId(wordIds: number[]): Observable<QuizzGameAnswerService> {
        return this.get<QuizzGameAnswerService>('/api/quizzGameAnswers?wordId='+ wordIds.join(','));
    }
}
