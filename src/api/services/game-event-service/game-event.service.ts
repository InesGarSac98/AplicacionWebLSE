import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameEvent } from 'src/api/models/GameEvents/gameEvent.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
    providedIn: 'root'
})
export class GameEventService extends CommonApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    public createGameEvent(gameEvent: GameEvent): Observable<GameEvent> {
        return this.post<GameEvent>('/api/gameEvents/', gameEvent);
    }
}
