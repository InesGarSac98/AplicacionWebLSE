import { Routes } from '@angular/router';
import { GameComponent } from '../students/game/game.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomComponent } from './classroom/classroom/classroom.component';
import { ClassroomFormComponent } from './classroom-form/classroom-form.component';
import { ProfileComponent } from './profile/profile.component';
import { GameConfigurationComponent } from './game-configuration/game-configuration.component';
import { TeacherDictionaryComponent } from './teacher-dictionary/teacher-dictionary.component';

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
                        path: 'games/:gameId',
                        pathMatch: 'full',
                        component: GameComponent
                    },
                    {
                        path: 'add-games',
                        children:[
                            {
                                path: ':gameId',
                                pathMatch: 'full',
                                component: GameConfigurationComponent
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: 'dictionary',
        pathMatch: 'full',
        component: TeacherDictionaryComponent
    },
];
