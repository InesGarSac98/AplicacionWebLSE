import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ComponentsComponent } from '../components/components.component';

import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

export const publicRoutes: Routes = [
    {
      path: 'home',
      pathMatch: 'full',
      component: HomeComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'login',
      pathMatch: 'full',
      component: LoginComponent
    },
]

@NgModule({
  imports: [
    RouterModule.forChild(publicRoutes),
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ComponentsComponent
  ]
})
export class PublicModule { }
