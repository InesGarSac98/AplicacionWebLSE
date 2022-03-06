import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/api/models/game.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends CommonApiService {

constructor(http: HttpClient) {
    super(http);
}
    public getGame(name: string): Observable<Game> {
        return this.get<Game>('/api/games/' + name);
    }

    public getGamesList(): Observable<Game[]> {
        return this.get<Game[]>('/api/games');
    }
}
