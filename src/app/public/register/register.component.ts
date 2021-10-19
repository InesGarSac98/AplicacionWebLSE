import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  public botonHaSidoPulsado(): void {
    alert('Hola mundo! El botón ha sido pulsado');
    this.router.navigate(['/dashboard']);
    
  }
}
