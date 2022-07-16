/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentLearnedWordsService } from './student-learned-words.service';

describe('Service: StudentLearnedWords', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentLearnedWordsService]
    });
  });

  it('should ...', inject([StudentLearnedWordsService], (service: StudentLearnedWordsService) => {
    expect(service).toBeTruthy();
  }));
});
