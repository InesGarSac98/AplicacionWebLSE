import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/api/models/classroom.model';
import { Teacher } from 'src/api/models/teacher.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';

@Component({
    selector: 'app-student-classroom-list',
    templateUrl: './classroom-list.component.html',
    styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

    public classrooms: IClassroomList[];

    constructor(
        private classroomsService: ClassroomsService,
        private userService: UsersService,
        private teacherService: TeachersService
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
                                });
                            });
                    })
            });
    }

    public deleteClass(classroomId: number) {
        this.classroomsService.deleteClassroom(classroomId).subscribe();
    }
}

export class IClassroomList {
    id: number;
    name: string;
    numStudents: number;
}
