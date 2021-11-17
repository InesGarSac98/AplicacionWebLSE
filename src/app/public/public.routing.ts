import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component';
import { AuthenticationGuard } from '../guards/authentication.guard';

export const PublicRoutes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthenticationGuard],
    component: ProfileComponent
  },
  {
    path: 'games',
    component: GamesComponent
  }
];
