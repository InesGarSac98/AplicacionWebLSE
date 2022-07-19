import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Classroom } from 'src/api/models/classroom.model';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { AppComponent } from 'src/app/app.component';
import { DeleteComponent } from 'src/app/shared/dialog/dialogs/delete/delete.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
    selector: 'app-student-classroom-list',
    templateUrl: './classroom-list.component.html',
    styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

    public classrooms: IClassroomList[];
    public x : boolean;
    private notifications: NotificationComponent;

    constructor(
        app: AppComponent,
        private classroomsService: ClassroomsService,
        private userService: UsersService,
        private teacherService: TeachersService,
        private http: HttpClient,
        public dialog: MatDialog
    ) {
        this.notifications = app.getNotificationsComponent();
    }

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
}

export class IClassroomList {
    id: number;
    name: string;
    numStudents: number;
}
