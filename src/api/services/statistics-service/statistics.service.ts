import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistics } from 'src/api/models/statistics.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService extends CommonApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    public getStudentStatistics(studentId: number): Observable<Statistics[]> {
        return this.get<Statistics[]>('/api/statistics/student/' + studentId);
    }

    public getClassroomStatistics(classroomId: number): Observable<Statistics[]> {
        return this.get<Statistics[]>('/api/statistics/classroom/' + classroomId);
    }
}
