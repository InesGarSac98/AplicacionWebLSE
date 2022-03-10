/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuizzGameQuestionService } from './quizz-game-question.service';

describe('Service: QuizzGameAnswer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizzGameQuestionService]
    });
  });

  it('should ...', inject([QuizzGameQuestionService], (service: QuizzGameQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
