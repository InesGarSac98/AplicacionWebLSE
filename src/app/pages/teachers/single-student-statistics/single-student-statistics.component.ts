import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/api/models/student.model';
import { StudentsService } from 'src/api/services/students-service/students.service';

@Component({
    selector: 'app-single-student-statistics',
    templateUrl: './single-student-statistics.component.html',
    styleUrls: ['./single-student-statistics.component.scss']
})
export class SingleStudentStatisticsComponent implements OnInit {
    public studentId: number;
    public classroomId: number;
    public student: Student;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentsService
    ) {

    }

    public async ngOnInit() {
        this.classroomId = this.route.snapshot.params['classroomId'];
        this.studentId = this.route.snapshot.params['studentId'];

        this.student = await this.studentService.getStudent(this.studentId).toPromise();
    }

    public goBackClicked(){
        this.router.navigate(['teachers/classrooms', this.classroomId]);
    }

}
