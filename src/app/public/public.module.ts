import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import {MatTabsModule} from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PublicRoutes } from './public.routing';
import { ProfileComponent } from './profile/profile.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserFormGroupComponent } from './register/form-groups/user-form-group/user-form-group.component';
import { TeacherFormGroupComponent } from './register/form-groups/teacher-form-group/teacher-form-group.component';
import { StudentFormGroupComponent } from './register/form-groups/student-form-group/student-form-group.component';
import { GamesComponent } from './games/games.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatTabsModule
  ],
  providers: [],
  declarations: [
    UserFormGroupComponent,
    TeacherFormGroupComponent,
    StudentFormGroupComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    GamesComponent
  ]
})
export class PublicModule {}
