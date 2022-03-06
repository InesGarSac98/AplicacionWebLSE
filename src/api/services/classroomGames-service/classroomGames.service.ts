import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassroomGame } from 'src/api/models/classroomGame';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
    providedIn: 'root'
})
export class ClassroomGamesService extends CommonApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getGame(name: string): Observable<ClassroomGame> {
        return this.get<ClassroomGame>('/api/classroomGames/' + name);
    }

    public createClassroomGame(gameId: number, classroomId: number): Observable<ClassroomGame> {
        return this.post<ClassroomGame>('/api/classroomGames/', { classroomId: classroomId, gameId: gameId });
    }

    public deleteClassroomGame(id: number): Observable<void> {
        return this.delete<void>('/api/classroomGames/' + id);
    }
}
