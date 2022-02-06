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

    public getWord(name: string): Observable<Word> {
        return this.get<Word>('/api/words/' + name);
    }
}
