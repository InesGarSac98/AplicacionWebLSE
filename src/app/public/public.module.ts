import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
export const publicRoutes: Routes = [
    {
      path: 'register',
      component: RegisterComponent
    },
    // {
    //   path: 'login',
    //   pathMatch: 'full',
    //   component: RegisterComponent
    // }
]

@NgModule({
  imports: [
    RouterModule.forChild(publicRoutes),
    CommonModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class PublicModule { }
