import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemoryGameClassroomConfiguration } from 'src/api/models/memoryGameClassroomConfiguration.model';
import { CommonApiService } from '../common-api/common-api.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryGameClassroomConfigurationService extends CommonApiService{

    constructor(http: HttpClient) {
        super(http);
    }

    public getMemoryGameClassroomConfigurationByClassroomId(classroomId: number): Observable<MemoryGameClassroomConfiguration> {
        return this.get("/api/memoryGameClassroomConfiguration?classroomId=" + classroomId);
    }

    public createMemoryGameClassroomConfiguration(memoryGameClassroomConfiguration: MemoryGameClassroomConfiguration): Observable<MemoryGameClassroomConfiguration> {
        return this.post<MemoryGameClassroomConfiguration>(
            '/api/memoryGameClassroomConfiguration',
            memoryGameClassroomConfiguration
        );
    }

    public updateMemoryGameClassroomConfiguration(memoryGameClassroomConfiguration: MemoryGameClassroomConfiguration): Observable<MemoryGameClassroomConfiguration> {
        return this.put<MemoryGameClassroomConfiguration>(
            '/api/memoryGameClassroomConfiguration/' + memoryGameClassroomConfiguration.id,
            memoryGameClassroomConfiguration
        );
    }
}
