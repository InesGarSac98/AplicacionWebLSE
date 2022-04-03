/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuizzGameClassroomConfigurationService } from './quizz-game-classroom-configuration.service';

describe('Service: QuizzGameClassroomConfiguration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizzGameClassroomConfigurationService]
    });
  });

  it('should ...', inject([QuizzGameClassroomConfigurationService], (service: QuizzGameClassroomConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
