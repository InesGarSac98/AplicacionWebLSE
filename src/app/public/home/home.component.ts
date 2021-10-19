import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

export const publicRoutes: Routes = [
  {
    path: 'navbar',
    pathMatch: 'full',
    component: NavbarComponent
  }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
