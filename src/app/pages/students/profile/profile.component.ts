import { Component, OnInit } from '@angular/core';
import { Student } from 'src/api/models/student.model';
import { StudentsService } from 'src/api/services/students-service/students.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public student: Student;

    constructor(
        private studentService: StudentsService
    ) {
    }

    public ngOnInit(): void {
        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.student = student;
        });
    }
}
