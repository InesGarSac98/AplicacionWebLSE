import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { UsersService } from 'src/api/services/users-service/users.service';

export const publicRoutes: Routes = [

]
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private userService: UsersService) { }
    public formGroup: FormGroup;
    hide = true;
    ngOnInit() {
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.maxLength(100), Validators.required]),
            password: new FormControl('', [Validators.maxLength(80), Validators.required])
        })
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
    // alert('Hola mundo! El botón ha sido pulsado');
    // this.router.navigate(['/dashboard']);

    this.userService
        .login(this.formGroup.controls.name.value, this.formGroup.controls.password.value)
        .subscribe((response: any) => {
            localStorage.setItem("token", response.token);
            this.router.navigate(['/dashboard']);
        })
  }


}
