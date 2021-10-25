import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { Routes } from '@angular/router';

export const publicRoutes: Routes = [

]
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
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
