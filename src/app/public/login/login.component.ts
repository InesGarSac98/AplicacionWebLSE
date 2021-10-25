import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

export const publicRoutes: Routes = [

]
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  hide = true;
  ngOnInit() {
  }


  // login() : void {
  //   if(this.username == 'admin' && this.password == 'admin'){
  //    this.router.navigate(["/dashboard"]);
  //   }else {
  //     this.router.navigate(["/dashboard"]);
  //     alert("Invalid credentials");
  //   }
  // }

  public botonHaSidoPulsado(): void {
    alert('Hola mundo! El botón ha sido pulsado');
    this.router.navigate(['/dashboard']);

  }


}
