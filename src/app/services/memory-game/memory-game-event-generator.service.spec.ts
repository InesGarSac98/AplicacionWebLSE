/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoryGameEventGeneratorService } from './memory-game-event-generator.service';

describe('Service: MemoryGameEventGenerator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryGameEventGeneratorService]
    });
  });

  it('should ...', inject([MemoryGameEventGeneratorService], (service: MemoryGameEventGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
