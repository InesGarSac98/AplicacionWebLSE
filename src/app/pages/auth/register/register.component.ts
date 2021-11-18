import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, Routes } from '@angular/router';
import { User } from 'src/api/models/user.model';
import { Teacher } from 'src/api/models/teacher.model';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { Student } from 'src/api/models/student.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class RegisterComponent implements OnInit {

    public formGroup: FormGroup;
    hide = true;

    constructor(
        private router: Router,
        private usersService: UsersService,
        private teachersService: TeachersService,
        private studentsService: StudentsService
    ) { }

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
            user: new FormGroup({
                name: new FormControl('', [Validators.maxLength(100), Validators.required]),
                email: new FormControl('', [Validators.maxLength(70), Validators.required]),
                password: new FormControl('', [Validators.maxLength(80), Validators.required])
            }),
            teacher: new FormGroup({
                userId: new FormControl('', [Validators.maxLength(100), Validators.required]),
                schoolName: new FormControl('', [Validators.maxLength(70), Validators.required])
            }),
            student: new FormGroup({
                userId: new FormControl('', [Validators.maxLength(100), Validators.required]),
                classroomCode: new FormControl('', [Validators.maxLength(70), Validators.required])
            }),
        });
    }

//SAVE TEACHER BUENO

    // public saveTeacher(): void {

    //     this.usersService.createNewUser(this.formGroup.controls.user.value)
    //         .subscribe((user: User) => {

    //             (this.formGroup.controls.teacher as FormGroup).controls.userId.setValue(user.id);
    //             this.teachersService.createNewTeacher(this.formGroup.controls.teacher.value)
    //             .subscribe((teacher: Teacher) => {
    //                 console.log(teacher);
    //                 this.router.navigate(['/dashboard']);
    //             });

    //         });
    // }

    public saveTeacher(): void {
        const name: string = this.formGroup.controls.name.value;
        const password: string = this.formGroup.controls.password.value;
        this.usersService.register(name, password)
            .subscribe((user: User) => {
                (this.formGroup.controls.teacher as FormGroup).controls.userId.setValue(user.id);
                this.teachersService.createNewTeacher(this.formGroup.controls.teacher.value)
                    .subscribe((teacher: Teacher) => {
                        this.usersService.login(name, password)
                            .subscribe((response: any) => {
                                localStorage.setItem('token', response.token);
                                this.router.navigate(['/dashboard']);
                            },
                            () => this.router.navigate(['/login']));
                    });
            });
        }



    public saveStudent(): void {

        this.usersService.createNewUser(this.formGroup.controls.user.value)
            .subscribe((user: User) => {

                (this.formGroup.controls.student as FormGroup).controls.userId.setValue(user.id);
                this.studentsService.createNewStudents(this.formGroup.controls.student.value)
                .subscribe((student: Student) => {
                    console.log(student);
                    this.router.navigate(['/dashboard']);
                });

            });
    }

}
