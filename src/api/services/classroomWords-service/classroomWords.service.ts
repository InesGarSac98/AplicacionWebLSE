import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http2Server } from 'http2';
import { Observable } from 'rxjs';
import { ClassroomWord } from 'src/api/models/classroomWord';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomWordsService extends CommonApiService{

constructor(http: HttpClient) {
    super(http);
}
public getGame(name: string): Observable<ClassroomWord> {
    return this.get<ClassroomWord>('/api/classroomWords/' + name);
}
}
