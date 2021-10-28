import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from 'src/api/models/user.model';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class RegisterComponent implements OnInit {

    public studentFormGroup: FormGroup;
    hide = true;

    constructor(
        private router: Router,
        private usersService: UsersService
    ) { }

    public ngOnInit(): void {
        this.studentFormGroup = new FormGroup({
            name: new FormControl('', [Validators.maxLength(100), Validators.required]),
            email: new FormControl('', [Validators.maxLength(70), Validators.required]),
            password: new FormControl('', [Validators.maxLength(80), Validators.required])
        })
    }


    public botonHaSidoPulsado(): void {
        /*alert('Hola mundo! El botón ha sido pulsado');
        this.router.navigate(['/dashboard']);
        */
        this.usersService.createNewUser(this.studentFormGroup.value)
            .subscribe((user: User) => {
                console.log(user);
                this.router.navigate(['/dashboard']);
            });
    }
}
