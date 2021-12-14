import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'students',
        loadChildren:
          () => import('./pages/students/students.module').then(m => m.StudentsModule)
      },
    ]
  }
];
