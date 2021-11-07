import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PublicRoutes } from './public.routing';
import { HomeComponent } from './home/home.component';

import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserFormGroupComponent } from './register/form-groups/user-form-group/user-form-group.component';
import { TeacherFormGroupComponent } from './register/form-groups/teacher-form-group/teacher-form-group.component';
import { StudentFormGroupComponent } from './register/form-groups/student-form-group/student-form-group.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    UserFormGroupComponent,
    TeacherFormGroupComponent,
    StudentFormGroupComponent,
    HomeComponent,
    AboutusComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class PublicModule {}
