import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classroom } from 'src/api/models/classroom.model';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { AppComponent } from 'src/app/app.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
    selector: 'app-classroom-form',
    templateUrl: './classroom-form.component.html',
    styleUrls: ['./classroom-form.component.scss']
})
export class ClassroomFormComponent implements OnInit {

    private notifications: NotificationComponent;
    constructor(
        app: AppComponent,
        private router: Router,
        private classroomsService: ClassroomsService,
        private userService: UsersService,
        private teacherService: TeachersService
    ) {
        this.notifications = app.getNotificationsComponent();
     }

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
            this.notifications.pushNotification('La clase ha sido guardada correctamente', 'success');
    }

}
