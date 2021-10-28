import { Routes } from '@angular/router';

import { LoginComponent } from '../public/login/login.component';
import { HomeComponent } from '../public/home/home.component';

export const MaterialRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
