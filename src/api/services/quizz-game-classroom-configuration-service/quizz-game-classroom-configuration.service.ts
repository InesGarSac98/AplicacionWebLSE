import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizzGameClassroomConfiguration } from 'src/api/models/quizzGameClassroomConfiguration.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizzGameClassroomConfigurationService extends CommonApiService{

    constructor(http: HttpClient) {
        super(http);
    }

    public getQuizzGameClassroomConfigurationByClassroomId(classroomId: number): Observable<QuizzGameClassroomConfiguration> {
        return this.get<QuizzGameClassroomConfiguration>("/api/quizzGameClassroomConfiguration?classroomId=" + classroomId);
    }

    public createQuizzGameClassroomConfiguration(quizzGameClassroomConfiguration: QuizzGameClassroomConfiguration): Observable<QuizzGameClassroomConfiguration> {
        return this.post<QuizzGameClassroomConfiguration>(
            '/api/quizzGameClassroomConfiguration',
            quizzGameClassroomConfiguration
        );
    }

    public updateQuizzGameClassroomConfiguration(quizzGameClassroomConfiguration: QuizzGameClassroomConfiguration): Observable<QuizzGameClassroomConfiguration> {
        return this.put<QuizzGameClassroomConfiguration>(
            '/api/quizzGameClassroomConfiguration/' + quizzGameClassroomConfiguration.id,
            quizzGameClassroomConfiguration
        );
    }
}
