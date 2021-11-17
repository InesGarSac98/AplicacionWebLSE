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
    ProfileComponent,
    GamesComponent
  ]
})
export class PublicModule {}
