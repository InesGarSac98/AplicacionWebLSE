/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuizzGameAnswerService } from './quizz-game-answer.service';

describe('Service: QuizzGameAnswer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizzGameAnswerService]
    });
  });

  it('should ...', inject([QuizzGameAnswerService], (service: QuizzGameAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
