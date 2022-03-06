import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from 'src/app/demo-material-module';
import {MatTabsModule} from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TeachersRoutes } from './teachers.routing';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassroomComponent } from './classroom/classroom/classroom.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { GameComponent } from '../students/game/game.component';
import { GamesListComponent } from './games/game-list/games-list.component';
import { ClassroomFormComponent } from './classroom-form/classroom-form.component';
import { AddWordsComponent } from './add-words/add-words.component';
import { AddGamesComponent } from './add-games/add-games.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TeachersRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTabsModule,
    SharedModule,
  ],
  providers: [],
  declarations: [
    ProfileComponent,
    ClassroomComponent,
    ClassroomListComponent,
    GamesListComponent,
    ClassroomFormComponent,
    AddWordsComponent,
    AddGamesComponent
  ]
})
export class TeachersModule {}
