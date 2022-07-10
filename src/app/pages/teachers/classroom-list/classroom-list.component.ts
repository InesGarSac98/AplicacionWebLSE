import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Classroom } from 'src/api/models/classroom.model';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { DeleteComponent } from 'src/app/shared/dialog/dialogs/delete/delete.component';

@Component({
    selector: 'app-student-classroom-list',
    templateUrl: './classroom-list.component.html',
    styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

    public classrooms: IClassroomList[];
    public x : boolean;

    constructor(
        private classroomsService: ClassroomsService,
        private userService: UsersService,
        private teacherService: TeachersService,
        private http: HttpClient,
        public dialog: MatDialog
    ) {

    }

    public ngOnInit(): void {
        this.userService.getUserLoged()
            .subscribe((user: User) => {
                this.teacherService.getTeacherByUserId(user.id)
                    .subscribe((teacher: Teacher) => {
                        this.classroomsService.getTeacherClassrooms(teacher.id)
                            .subscribe((classrooms: Classroom[]) => {
                                console.log(classrooms);
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
        console.log("public deleteClass(classroomId: number) {");
        console.log(classroomId);


        let dialogRef = this.dialog.open(DeleteComponent);

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
            if(result){
                this.classroomsService.deleteClassroom(classroomId)
                    .subscribe(_ => {
                        this.classrooms.splice(this.classrooms.findIndex(c => c.id === classroomId), 1);
                    });
            }
        });
    }
}

export class IClassroomList {
    id: number;
    name: string;
    numStudents: number;
}
