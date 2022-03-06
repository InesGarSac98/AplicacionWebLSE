/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameEventService } from './game-event.service';

describe('Service: GameEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameEventService]
    });
  });

  it('should ...', inject([GameEventService], (service: GameEventService) => {
    expect(service).toBeTruthy();
  }));
});
