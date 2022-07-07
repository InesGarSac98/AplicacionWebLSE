import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';
import { StudentDictionaryComponent } from './dictionary/student-dictionary.component';

export const StudentsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'games',
        component: GamesListComponent
    },
    {
        path: 'games/:gameId',
        component: GameComponent
    },
    {
        path: 'dictionary',
        pathMatch: 'full',
        component: StudentDictionaryComponent
    }
];
