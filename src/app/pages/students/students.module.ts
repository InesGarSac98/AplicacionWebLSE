import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

import { DemoMaterialModule } from 'src/app/demo-material-module';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StudentsRoutes } from './students.routing';
import { ProfileComponent } from './profile/profile.component';

import { GamesListComponent } from './games-list/games-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { GameComponent } from './game/game.component';
import { StudentDictionaryComponent } from './dictionary/student-dictionary.component';
import { ProgressComponent } from './profile/progress/progress.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentsRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTabsModule,
    SharedModule,
    NgxChartsModule
  ],
  providers: [
    DatePipe
  ],
  declarations: [
    ProfileComponent,
    GamesListComponent,
    GameComponent,
    StudentDictionaryComponent,
    ProgressComponent
  ]
})
export class StudentsModule {}
