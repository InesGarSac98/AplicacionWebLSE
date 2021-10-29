import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from 'src/api/models/user.model';
import { Teacher } from 'src/api/models/teacher.model';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
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
    public teacherFormGroup: FormGroup;

    constructor(
        private router: Router,
        private usersService: UsersService,
        private teachersService: TeachersService
    ) { }

    public ngOnInit(): void {
        this.studentFormGroup = new FormGroup({
            name: new FormControl('', [Validators.maxLength(100), Validators.required]),
            email: new FormControl('', [Validators.maxLength(70), Validators.required]),
            password: new FormControl('', [Validators.maxLength(80), Validators.required])
        }),
        this.teacherFormGroup = new FormGroup({
            name: new FormControl('', [Validators.maxLength(100), Validators.required]),
            email: new FormControl('', [Validators.maxLength(70), Validators.required]),
            password: new FormControl('', [Validators.maxLength(80), Validators.required])
        })
    }


    public botonHaSidoPulsado(): void {
        /*alert('Hola mundo! El botón ha sido pulsado');
        this.router.navigate(['/dashboard']);
        */

        // console.log("Valor formulario user:",this.studentFormGroup.value);



        // if (this.usersService.createNewUser(this.teacherFormGroup.value)){

        //     this.usersService.createNewUser(this.teacherFormGroup.value)
        //         .subscribe((teacher: Teacher) => {
        //             console.log(teacher);
        //             this.router.navigate(['/dashboard']);
        //         });
        // }else{
        //     console.log("No es teacher");
        // }



        this.usersService.createNewUser(this.studentFormGroup.value)
            .subscribe((user: User) => {

                console.log("Valor formulario teacher:",this.teacherFormGroup.value);

                this.teachersService.createNewTeacher(this.teacherFormGroup.value)
                    .subscribe((teacher: Teacher) => {
                        console.log(teacher);
                        this.router.navigate(['/dashboard']);
                    });
            });


    }
}
