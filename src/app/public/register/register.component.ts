import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
