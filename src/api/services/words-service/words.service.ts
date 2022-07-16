import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from 'src/api/models/word.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService extends CommonApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    public getWordsList(): Observable<Word[]> {
        return this.get<Word[]>('/api/words');
    }

    public getWord(name: string): Observable<Word> {
        return this.get<Word>('/api/words/' + name);
    }

    public findWordInArasaac(word: string): Observable<any> {
        return this.get<any>('/api/words/' + word + '/find-in-arasaac');
    }

    public saveWord(word: Word): Observable<Word> {
        return this.post<Word>('/api/words', word);
    }

    public deleteWord(wordId: number): Observable<Word> {
        return this.delete<Word>('/api/words/' + wordId);
    }
}
