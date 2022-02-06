import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classroom } from 'src/api/models/classroom.model';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
    selector: 'app-classroom-form',
    templateUrl: './classroom-form.component.html',
    styleUrls: ['./classroom-form.component.scss']
})
export class ClassroomFormComponent implements OnInit {

    constructor(
        private router: Router,
        private classroomsService: ClassroomsService,
        private userService: UsersService,
        private teacherService: TeachersService
    ) { }

    public formGroup: FormGroup;

    public ngOnInit() {

        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.maxLength(100), Validators.required]),
            teacherId: new FormControl('')
        });
    }

    public saveClassroom(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => {
                this.teacherService.getTeacherByUserId(user.id)
                    .subscribe((teacher: Teacher) => {
                        this.formGroup.controls.teacherId.setValue(teacher.id);
                        this.classroomsService.createNewClassroom(this.formGroup.value)
                            .subscribe((classroom: Classroom) => {
                                console.log(classroom);

                                this.router.navigate(['/teachers/classrooms']);
                            });
                    });
            });
    }

}
