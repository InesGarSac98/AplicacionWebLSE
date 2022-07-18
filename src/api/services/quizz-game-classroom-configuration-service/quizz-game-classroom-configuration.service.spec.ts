/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuizzGameClassroomConfigurationService } from './quizz-game-classroom-configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('Service: QuizzGameClassroomConfiguration', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpClient, QuizzGameClassroomConfigurationService]
        });
    });

    it('should ...', inject([QuizzGameClassroomConfigurationService], (service: QuizzGameClassroomConfigurationService) => {
        expect(service).toBeTruthy();
    }));
});
