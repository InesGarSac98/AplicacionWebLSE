import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card'
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatListModule } from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatRadioModule} from '@angular/material/radio';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule} from '@angular/material/select';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs'; 


export const publicRoutes: Routes = [
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
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatTabsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]

})
export class PublicModule { }
