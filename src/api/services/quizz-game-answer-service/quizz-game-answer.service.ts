import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizzGameAnswer } from 'src/api/models/quizzGameAnswer.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizzGameAnswerService extends CommonApiService{

    constructor(http: HttpClient) {
        super(http);
    }

    public getQuizzGameQuestionsByWordId(wordIds: number[]): Observable<QuizzGameAnswer> {
        return this.get<QuizzGameAnswer>('/api/quizzGameAnswers?wordId='+ wordIds.join(','));
    }

    public createQuizzGameAnswer(answer: QuizzGameAnswer): Observable<QuizzGameAnswer>{
        return this.post<QuizzGameAnswer>('/api/quizzGameAnswers', answer);
    }

    public updateQuizzGameAnswer(answer: QuizzGameAnswer): Observable<QuizzGameAnswer>{
        return this.put<QuizzGameAnswer>('/api/quizzGameAnswers/' + answer.id, answer);
    }

    public deleteQuizzGameAnswer(id: number): Observable<void>{
        return this.delete<void>('/api/quizzGameAnswers/' + id);
    }
}
