import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Classroom } from 'src/api/models/classroom.model';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { AppComponent } from 'src/app/app.component';
import { DialogTemplateComponent } from 'src/app/shared/dialog/dialog-template/dialog-template.component';
import { DeleteComponent } from 'src/app/shared/dialog/dialogs/delete/delete.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
    selector: 'app-student-classroom-list',
    templateUrl: './classroom-list.component.html',
    styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

    public classrooms: IClassroomList[];
    public createNewClassroomButtons: DialogButton[];
    public x : boolean;
    private notifications: NotificationComponent;
    @ViewChild('wordDetailsDialogTemplate') public wordDetailsDialogTemplate: TemplateRef<any>;

    constructor(
        app: AppComponent,
        private classroomsService: ClassroomsService,
        private userService: UsersService,
        private teacherService: TeachersService,
        private http: HttpClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
        this.notifications = app.getNotificationsComponent();

        this.createNewClassroomButtons = [
            {
                text: 'Añadir',
                clicked: () => this.saveClassroom()
            }
        ]
    }

    public formGroup: FormGroup;

    public getColor(i: number): string {
        const colors = ["#BFEBFF", "#EFDDF7", "#DCF4E7", "#F9FCCF", "#FCD4BD", "#FFC5C5"];

        return colors[i % (colors.length)];
    }

    public ngOnInit(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => {
                this.teacherService.getTeacherByUserId(user.id)
                    .subscribe((teacher: Teacher) => {
                        this.classroomsService.getTeacherClassrooms(teacher.id)
                            .subscribe((classrooms: Classroom[]) => {
                                this.classrooms = classrooms.map(c => {
                                    let result = new IClassroomList();
                                    result.id = c.id;
                                    result.name = c.name;
                                    result.numStudents = c.students.length;
                                    return result;
                                }).sort((a, b) => a.name > b.name ? 1 : -1);
                            });
                    })
            });


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
                                this.router.navigate(['/teachers/classrooms/']);
                            });
                    });
            });
            this.notifications.pushNotification('La clase ha sido guardada correctamente', 'success');

    }

    public deleteClass(classroomId: number) {

        let dialogRef = this.dialog.open(DeleteComponent);

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.classroomsService.deleteClassroom(classroomId)
                    .subscribe(_ => {
                        this.classrooms.splice(this.classrooms.findIndex(c => c.id === classroomId), 1);
                    });
                    this.notifications.pushNotification('La clase ha sido borrada correctamente', 'success');
            }
        });

    }

    public createNewClassroom(): void {

        this.dialog.open(
            DialogTemplateComponent,
            {
                data: {
                    template: this.wordDetailsDialogTemplate,
                    dialogButtons: this.createNewClassroomButtons,
                    dialogTitle: "Añadir clase"
                }
            }
        );

    }
}

export class IClassroomList {
    id: number;
    name: string;
    numStudents: number;
}

export class DialogButton {
    text: string;
    clicked: Function
}
