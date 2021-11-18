import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import {MatTabsModule} from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { UserFormGroupComponent } from './register/form-groups/user-form-group/user-form-group.component';
import { TeacherFormGroupComponent } from './register/form-groups/teacher-form-group/teacher-form-group.component';
import { StudentFormGroupComponent } from './register/form-groups/student-form-group/student-form-group.component';
import { PublicRoutes } from '../auth/auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



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
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule {}
