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

    public createQuizzGameQuestion(question: QuizzGameQuestion): Observable<QuizzGameQuestion>{
        return this.post<QuizzGameQuestion>('/api/quizzGameQuestions', question);
    }

    public updateQuizzGameQuestion(question: QuizzGameQuestion): Observable<QuizzGameQuestion>{
        return this.put<QuizzGameQuestion>('/api/quizzGameQuestions/' + question.id, question);
    }

    public deleteQuizzGameQuestion(id: number): Observable<void>{
        return this.delete<void>('/api/quizzGameQuestions/' + id);
    }

    public getQuizzGameQuestionsByConfigurationId(configurationId: number): Observable<QuizzGameQuestion[]> {
        return this.get<QuizzGameQuestion[]>('/api/quizzGameQuestions?configurationId='+ configurationId);
    }


}
