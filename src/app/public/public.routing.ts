import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { GamesComponent } from './games/games.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const PublicRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
