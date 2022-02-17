/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassroomGamesService } from './classroomGames.service';

describe('Service: ClassroomGames', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomGamesService]
    });
  });

  it('should ...', inject([ClassroomGamesService], (service: ClassroomGamesService) => {
    expect(service).toBeTruthy();
  }));
});
