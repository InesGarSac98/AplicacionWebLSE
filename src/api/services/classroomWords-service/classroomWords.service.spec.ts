/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassroomWordsService } from './classroomWords.service';

describe('Service: ClassroomGames', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomWordsService]
    });
  });

  it('should ...', inject([ClassroomWordsService], (service: ClassroomWordsService) => {
    expect(service).toBeTruthy();
  }));
});
