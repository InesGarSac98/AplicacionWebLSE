import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { GamesListComponent } from './games-list/games-list.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';
import { GameComponent } from './game/game.component';

export const StudentsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        canActivate: [AuthenticationGuard],
        component: ProfileComponent
    },
    {
        path: 'games',
        component: GamesListComponent
    },
    {
        path: 'games/:gameId',
        component: GameComponent
    }
];
