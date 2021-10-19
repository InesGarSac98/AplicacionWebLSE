import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavbarComponent]
})
export class NavbarModule { }
