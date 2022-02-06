import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/api/models/classroom.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';


@Component({
  selector: 'app-student-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

  public classrooms: IClassroomList[];

    constructor(private classroomsService: ClassroomsService) {

    }

  public ngOnInit(): void {
      this.classroomsService.getTeacherClassrooms(2)
        .subscribe((classrooms: Classroom[])=>{
            console.log(classrooms);
            this.classrooms = classrooms.map(c => {
                let result = new IClassroomList();
                result.id = c.id;
                result.name = c.name;
                result.numStudents = c.students.length;
                return result;
            });
        });
  }
}

export class IClassroomList {
    id: number;
    name: string;
    numStudents: number;
}
