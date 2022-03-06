import { Routes } from '@angular/router';

import { AuthenticationGuard } from 'src/app/guards/authentication.guard';
import { GameComponent } from '../students/game/game.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomComponent } from './classroom/classroom/classroom.component';
import { ClassroomFormComponent } from './classroom-form/classroom-form.component';
import { GamesListComponent } from './games/game-list/games-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AddWordsComponent } from './add-words/add-words.component';
import { AddGamesComponent } from './add-games/add-games.component';

export const TeachersRoutes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent
    },
    {
        path: 'games',
        pathMatch: 'full',
        component: GamesListComponent
    },
    {
        path: 'games/:gameId',
        component: GameComponent
    },
    {
        path: 'classrooms',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ClassroomListComponent
            },
            {
                path: 'classrooms-form',
                pathMatch: 'full',
                component: ClassroomFormComponent
            },
            {
                path: ':classroomId',
                children:[
                    {
                        path: '',
                        pathMatch: 'full',
                        component: ClassroomComponent
                    },
                    {
                        path: 'add-words',
                        pathMatch: 'full',
                        component: AddWordsComponent
                    },
                    {
                        path: 'add-games',
                        pathMatch: 'full',
                        component: AddGamesComponent
                    },
                ]
            },
        ]
    },
];
