import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizzGameQuestion } from 'src/api/models/quizzGameQuestion.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizzGameQuestionService extends CommonApiService{

    constructor(http: HttpClient) {
        super(http);
    }

    public getQuizzGameQuestionsByWordId(wordIds: number[]): Observable<QuizzGameQuestion[]> {
        return this.get<QuizzGameQuestion[]>('/api/quizzGameQuestions?wordId='+ wordIds.join(','));
    }
}
