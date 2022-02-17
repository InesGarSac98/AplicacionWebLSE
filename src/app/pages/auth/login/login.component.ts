import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from 'src/api/models/user.model';
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
    public hide = true;
    private message ='';

    public ngOnInit() {
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.maxLength(100), Validators.required]),
            password: new FormControl('', [Validators.maxLength(80), Validators.required])
        });

        document.getElementById('name')?.addEventListener('keypress',function(event){
            if(event.keyCode == 13){
                event.preventDefault();
            }
        });
    }

    public loginPressed(): void {
        // alert('Hola mundo! El botón ha sido pulsado');
        // this.router.navigate(['/dashboard']);

        this.userService
            .login(this.formGroup.controls.name.value, this.formGroup.controls.password.value)
            .subscribe((response: any) => {
                localStorage.setItem('token', response.token);
                this.userService.getUserLoged().subscribe((user: User) => {
                    if (user.role === 'STUDENT') {
                        this.router.navigate(['/students/profile']);
                    }
                    else if (user.role === 'TEACHER') {
                        console.log("Soy profesor")
                        this.router.navigate(['/teachers/profile']);
                    }
                });

            }, (error) => {
                this.message = error;
            }
        )

    }


}
