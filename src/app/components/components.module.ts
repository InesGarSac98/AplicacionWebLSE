import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes } from '@angular/router';
import { MaterialComponentsModule } from '../material-component/material.module';
import { DemoMaterialModule } from '../demo-material-module';

export const publicRoutes: Routes = [
  {
    path: 'navbar',
    pathMatch: 'full',
    component: NavbarComponent
  }
]

@NgModule({
  imports: [
    CommonModule

  ],
  declarations: [ComponentsComponent]
})
export class ComponentsModule { }
