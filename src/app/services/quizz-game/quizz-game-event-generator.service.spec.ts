/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuizzGameEventGeneratorService } from './quizz-game-event-generator.service';

describe('Service: QuizzGameEventGenerator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizzGameEventGeneratorService]
    });
  });

  it('should ...', inject([QuizzGameEventGeneratorService], (service: QuizzGameEventGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
