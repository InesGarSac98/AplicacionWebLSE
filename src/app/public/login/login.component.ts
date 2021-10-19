import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

export const publicRoutes: Routes = [
  {
    path: 'navbar',
    pathMatch: 'full',
    component: NavbarComponent
  }
]
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private router: Router) { }

  username!: string;
  password!: string;

  ngOnInit() {
  }

  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigate(["/dashboard"]);
    }else {
      this.router.navigate(["/dashboard"]);
      alert("Invalid credentials");
    }
  }
  

}
