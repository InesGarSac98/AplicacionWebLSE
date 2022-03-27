import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentStatistics } from 'src/api/models/studentStatistics.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService extends CommonApiService {

    constructor(http: HttpClient) {
        super(http);
    }
    public getStudentStatistics(studentId: number): Observable<StudentStatistics[]> {
        return this.get<StudentStatistics[]>('/api/statistics/student/' + studentId);
    }
    //TODO: coger estadistica toda clase
}
