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

import { StudentsRoutes } from './students.routing';
import { ProfileComponent } from './profile/profile.component';

import { GamesListComponent } from './games-list/games-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { GameComponent } from './game/game.component';
import { ReviewComponent } from './review/review.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentsRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatTabsModule,
    SharedModule,

  ],
  providers: [],
  declarations: [
    ProfileComponent,
    GamesListComponent,
    GameComponent,
    ReviewComponent,
    ProgressComponent
  ]
})
export class StudentsModule {}
