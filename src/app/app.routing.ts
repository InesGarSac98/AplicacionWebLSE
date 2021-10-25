import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';

export const AppRoutes: Routes = [
    {
      path: 'dashboard',
      component: FullComponent,
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'public',
      component: PublicComponent,
      pathMatch: 'prefix',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
      path: '',
      redirectTo: 'public/login',
      pathMatch: 'full'
    }
];
