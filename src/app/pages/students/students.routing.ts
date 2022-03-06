import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { GamesListComponent } from './games-list/games-list.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';
import { GameComponent } from './game/game.component';
import { ProgressComponent } from './progress/progress.component';
import { ReviewComponent } from './review/review.component';

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
        path: 'progress',
        component: ProgressComponent
    },
    {
        path: 'review',
        pathMatch: 'full',
        component: ReviewComponent
    }

];
